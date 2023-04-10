# Github Action для интеграции Github PR с Jira Issue

## Описание

Данный [github action](https://docs.github.com/en/actions) создан для интеграции в Pull Request'ов в Jira Software.

### Тригер

Данный Action должен запускаться по событию [pull_request_review](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_review), а именно по типу `submitted`.

### Принцип работы (логика)

1. Валидация
   - Проверка соответствия event'а
   - Проверка типа review
2. Поиск прикрепленных задач к Pull Request'у
   - Сбор источников
     - Заголовок Pull Request'а
     - Название ветки разработки (git branch)
     - Описание Pull Request'а (делится построчно, каждая строка один источник)
   - Проверка, валидация и извлечение IssueKey по следующему паттерну:
     ```javascript
     // const jira_project_key = 'IYM';
     new RegExp(`^${jira_project_key}\-(\\d+)`);
     ```
   - Если задач не нашлось - **успешно завершаем работу без изменений Jira Issue**
3. Запрос информации по каждому найденному ключу
   - Игнорируем ошибки (не найдено, нет доступа)
   - Исключаем задачи, статус которых **НЕ** в списке ниже:
     - `ready for review`
     - `review in progress`
     - `to test`
     - `testing`
   - Если после фильтрации не осталось задач: **успешно завершаем работу без изменений Jira Issue**
4. Выявление режима review Pull Request'а по исполнителю:
   - Если исполнитель review из команды [CodeReviewers](https://github.com/orgs/ipakyulibank/teams/codereviewers) - режим `code_review`
   - Если исполнитель review из команды [QA](https://github.com/orgs/ipakyulibank/teams/qa) - режим `test`
5. Выявление режима review Jira Issue по статусу задачи в Jira:
   - Если `ready for review` или `review in progress` - `code_review`
   - Если `to test` или `testing` - `test`
6. Выявление резолюции по PR (`accept`, `reject`)
   `accept` - это `approved`
   `reject` - это `commented`, `changes_requested`
7. Выполнение нужных действий на основание режимов, резолюции и текущих статусов задач
   - Если режимы PR и Jira Issue равны, то
     - Если резолюция `accept`
       - Если режим `code_review` - доводение* задачу до статуса `to test`
         В этом случаи, считается, что PR проверен специалистом по коду (разработчиком).
       - Если режим `test` - доводение* задачу до статуса `dev completed`
         В данном случаи, подразумевается, что тестировщик успешно проверил фукнционал
     - Если резолюция `reject`
       - Выявляение исполнителя по истории изменения Jira Issue
       - Доведение задачи до статуса `to do`
       - Назначение исполнителя задачи на выявленного исполнителя в первом пункте в данном списке
   - Если режимы PR и Jira Issue не равны - **успешно завершаем работу без изменений Jira Issue**

## Входные параметры (input)

### `github_token`

**Обязательный** параметр. [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) для доступа в Github. Данный PAT должен иметь доступ читать PR всей организации, читать Org Teams

### `jira_url`

**Обязательный** параметр. Адрес Jira Software для команды, пример параметра: `yourteam.atlassian.net`.



### `jira_user`

**Обязательный** параметр. Пользователь для доступа в Rest API Jira (email)


### `jira_token`

**Обязательный** параметр. Токен доступа для вышеуказанного пользователя (создается в настройках)


### `jira_project_key`

**Обязательный** параметр. Project Key для проекта, в который нужна интеграция

### `jira_project_key`

**Обязательный** параметр. Project Key для проекта, в который нужна интеграция

## `user_mappings`

**Обязательны** параметр. Связка пользователей в Jira и Github.
JSON encoded string, который содержит массив каждый элемент которого представляет из себя:
```jsonc
[
  "Vasiliy Pupkin", // 0 элемент - Имя Фамилия
  "987fs98df9a7sdfsafdasd", // 1 элемент - accountId - в Jira
  214125, // 2 элемент - Github User ID
  "vasyapupkin", // 3 элемент - Github Login
]
```
Ни Github Rest API, ни Jira Api не позволяют получить email'ы пользователей.
Поэтому, для связки пользовтелей в двух системах подразумевается `user_mappings`.



## Вывод (output)

### `affected_issues`

Если были изменения в Issue, то в данный параметр записывается json строчка с массивом ключей:
Пример:
```json
["ABC-142","ABC-53"]
```

##  Пример использования
```yaml
name: "Awesome Jira Integration Action"
on:
  pull_request_review:
    types: [submitted]

jobs:
  update-jira-issue:
    runs-on: ubuntu-latest
    steps:
      - name: Integration
        id: jira-issues
        uses: ipakyulibank/actions/jira-pull-requests@v1
        with:
          github_token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          jira_url: ${{ secrets.JIRA_URL }}
          jira_user: ${{ secrets.JIRA_BOT_USER }}
          jira_token: ${{ secrets.JIRA_BOT_TOKEN }}
          jira_project_key: ABC
          user_mappings: ${{ secrets.USER_MAPPINGS_JSON }}
      - name: Notify chat
        uses: some-other-action
        with:
          message: |
            Привет, вот эти задачи изменены
            ${{ join( fromJSON(steps.jira-issues.outputs.affected_issues), ', ' ) }}.
```
# Github Action для валидация пути при релиз 

## Описание

Данный [github action](https://docs.github.com/en/actions) создан для проверки есть ли изменения в файлах по шаблону [glob](https://en.wikipedia.org/wiki/Glob_(programming)).

### Тригер

Данный Action должен запускаться по событию [release](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#release) и [pull_request](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request).

### Принцип работы (логика)

1. Проверить eventType
    - Если "release"
      - Проверяет тип события
      - Проверяет, было ли выполнено действие
      - Проверяет, является ли действие уже "prerelease"
      - Проверяет, указана ли filter_string в ENV
      - Узнайте последние выпуски с github API
      - Вытяните репо с тегами
      - Сравнивает обязательные теги с "git diff --names-only"
    - Если "pull_request" или "push"
      - Проверяет, указана ли filter_string в ENV
      - Убедитесь, что свойства base и head установлены для полезной нагрузки.
      - Имя файлов diff загружается с помощью github rest API, сравнивающего базовые и головные ссылки.
2. Если в списке файлов есть хотя бы один файл, удовлетворяющий условию в фильтре, он вернет в переменную результат = ‘1’, иначе ‘0’


## Входные параметры (input)

### `github_token`

**Обязательный** параметр. [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) для доступа в Github. Данный PAT должен иметь доступ читать PR всей организации, читать Org Teams

### `filter_string`

**Обязательный** параметр. Строка, используемая для фильтрации путей, пример параметра: `*`.


## Вывод (output)

### `result`

Подтверждение того, что все проверки прошли:
Пример:
```json
["1","0"]
```

##  Пример использования
```yaml
name: "Path Filter Action"
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  release:
    types:
      - published

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Path filter validation
        uses: ipakyulibank/actions/path-filter@betatest
        id: pathfilter
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          filter_string: '*path-filter.yml'
      - name: Show result    
        run: echo "RESULT IS ${{ steps.pathfilter.outputs.result }}"

```
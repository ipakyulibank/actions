# Github Action для валидация пути при релиз 

## Описание

Данный [github action](https://docs.github.com/en/actions) создан для проверки пути.

### Тригер

Данный Action должен запускаться по событию [pull_request_review](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_review), а именно по типу `submitted`.

### Принцип работы (логика)

1. Проверяет eventType
    - Если "release"
      - Проверяет тип события
      - Проверяет, было ли действие выпущено
      - Проверяет, является ли действие уже «prerelease»
      - Проверяет, указана ли filter_string в ENV
      - Сравнивает необходимые теги через «git diff»
    - Если "pull_request" или "push"
      - Проверяет, указана ли filter_string в ENV
      - Убедитесь, что для полезной нагрузки заданы свойства base и head
      - Имя необходимых файлов загружается через github.paginate()
2. Результат сравнения требуемых тегов возвращается в виде булеан


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
name: "Awesome Path Filter Action"
on:
  pull_request_review:
    types: [submitted]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Path filter validation
        uses: ipakyulibank/actions/path-filter@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          filter_string: '*'
```
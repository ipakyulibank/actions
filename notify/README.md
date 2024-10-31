# Github Action для отправки уведомления в телеграмму 

## Описание

Данный [github action](https://docs.github.com/en/actions) создан для проверки есть ли изменения в файлах по шаблону [glob](https://en.wikipedia.org/wiki/Glob_(programming)).

### Тригер

Данный Action должен запускаться по событию [release](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#release).types, а именно по типу `published`.

### Принцип работы (логика)

1. Проверяет длину параметра BODY
  - Если длина параметра BODY превышает 3990
    - вернет исключение
  - отправляет уведомление
2. Результат возвращается как '1' или '0' при отправке уведомления.



## Входные параметры (input)

### `BOT_TOKEN`

**Обязательный** параметр. Использовать бота в Telegram.

### `CHAT_ID`

**Обязательный** параметр. Токен группы, которой отправляется уведомление.

### `BODY`

**Обязательный** параметр. Текст уведомления будет отправлен в группу Telegram.

### `PARSE_MODE`

**Обязательный** параметр. Формат текста для отправки.

### `THREAD_ID`

**Необязательный** параметр. Отправляет в указанную ветвь суперчата


## Вывод (output)

### `result`

Подтверждение того, что уведомление отправлено:
Пример:
```json
["1","0"]
```

##  Пример использования
```yaml
name: "Telegram notifier Action"
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
        uses: actions/checkout@v3
      - name: Make Template
        id: notifyTemplate
        uses: actions/github-script@v6
        with:
          script: |
            let tgMsg = '*Test message*';
              
            core.setOutput('template', tgMsg);

      - name: Comment about succesful deploy
        id: notify
        uses: ipakyulibank/actions/notify@betatest
        with:
          BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
          BODY: ${{ steps.notifyTemplate.outputs.template }}
          PARSE_MODE: MarkdownV2
      - name: Show result
        run: echo "RESULT IS ${{ steps.notify.outputs.result }}"

```
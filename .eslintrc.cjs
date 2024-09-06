/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vue/vue3-strongly-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'quotes': ['error', 'single'], // Использование одинарных кавычек
    'no-trailing-spaces': 'error', // Запрет на наличие пробелов в конце строк
    'semi': ['error', 'always'], // Обязательность на использование точки с запятой
    'object-curly-spacing': ['error', 'always'], // Отступ внутри фигурных скобок
    'space-infix-ops': 'error', // Отступ вокруг знака равенства в выражении
    'space-in-parens': ['error', 'never'], // Отступ внутри параметров функции
    'indent': ['error', 2], // Отступы - 2 пробела
    'vue/component-tags-order': ['error', {
      'order': ['script', 'template', 'style']
    }],
    'vue/max-attributes-per-line': ['error', { // В одной строке/многострочном разрешался только один атрибут (singleline/multiline: 1).
      'singleline': {
        'max': 1
      },
      'multiline': {
        'max': 1
      }
    }],
    // 'vue/multi-word-component-names': ['error', { 'ignores': ['index', 'default']}], // Компоненты, для которых правило не применяется
    'vue/require-default-prop': 0,
    'vue/multi-word-component-names': 0, // Компоненты, для которых правило не применяется
    'padding-line-between-statements': [
      'error',
      // Всегда добавлять пустую строку перед оператором return
      { blankLine: 'always', prev: '*', next: 'return' },

      // Всегда добавлять пустую строку перед определением функции
      { blankLine: 'always', prev: '*', next: 'function' },

      // Всегда добавлять пустую строку после блоков кода (например, после блока if, for, while)
      { blankLine: 'always', prev: 'block-like', next: '*' },

      // Всегда добавлять пустую строку перед блоками кода
      { blankLine: 'always', prev: '*', next: 'block-like' },

      // Всегда добавлять пустую строку после директив (например, "use strict")
      { blankLine: 'always', prev: 'directive', next: '*' },

      // Всегда добавлять пустую строку перед директивами
      { blankLine: 'always', prev: '*', next: 'directive' },

      // Не добавлять пустую строку между импортами
      { blankLine: 'any', prev: 'import', next: 'import' },

      // Всегда добавлять пустую строку после импортов
      { blankLine: 'always', prev: 'import', next: '*' },

      // Запрещает пустую строку между двумя import операторами
      { blankLine: 'never', prev: 'import', next: 'import' },

      // Не добавлять пустую строку между объявлениями переменных одного типа (const, let, var)
      { blankLine: 'any', prev: 'const', next: 'const' },
      { blankLine: 'any', prev: 'let', next: 'let' },
      { blankLine: 'any', prev: 'var', next: 'var' },

      // Всегда добавлять пустую строку после объявлений переменных (const, let, var), за исключением случая, когда следующий оператор - это функция
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: 'function' },

      // Не добавлять пустую строку между разными объявлениями переменных (const, let, var)
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ]
  }
}

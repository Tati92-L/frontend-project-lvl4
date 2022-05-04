// @ts-check

export default {
  ru: {
    translation: {
      header: {
        logoutBtn: 'Выйти',
        logoutHead: 'Hexlet Chat',
      },
      loginPage: {
        loginTitle: 'Войти',
        errorMessageLogin: 'Неверные имя пользователя или пароль',
        loginBtn: 'Войти',
        noAccount: 'Нет аккаунта?',
        registrationLink: 'Регистрация',
        loginValidation: {
          minMaxLength: 'От 3 до 20 символов',
          requiredName: 'Имя пользователя не указано',
          passwordMinValid: 'Не менее 6 символов',
          requiredPassword: 'Пароль не указан',
        },
        loginForm: {
          usernameLogin: 'Ваш ник',
          passwordLogin: 'Пароль',
        },
        networkError: 'Ошибка соединения',
      },
      signUpPage: {
        signUpTitle: 'Регистрация',
        errorMessageSignUp: 'Пользователь с таким именем уже существует!',
        signUpBtn: 'Зарегестрироваться',
        signUpValidation: {
          minMaxLength: 'От 3 до 20 символов',
          requiredName: 'Имя пользователя не указано',
          passwordMinValid: 'Не менее 6 символов',
          requiredPassword: 'Пароль не указан',
          passwordMatch: 'Пароли должны совпадать',
        },
        signUpForm: {
          usernameSignUp: 'Имя пользователя',
          passwordSignUp: 'Пароль',
          confirmPassword: 'Подтвердите пароль',
        },
        networkError: 'Ошибка соединения',
      },
      chatPage: {
        chatColumn: {
          chatTitle: 'Каналы',
          changeChnlBtn: 'Управление каналом',
          removeBtn: 'Удалить',
          renameBtn: 'Переименовать',
          plusBtn: '+',
        },
        chatMessages: {
          messagesCounter: {
            count_one: '{{count}} сообщение',
            count_few: '{{count}} сообщения',
            count_many: '{{count}} сообщений',
          },
          messagePlaceholder: 'Введите сообщение...',
          messageAriaLabel: 'Новое сообщение',
          messageSubmitBtn: 'Отправить',
        },
      },
      modalElements: {
        modalValid: {
          modalRequired: 'Обязательное поле',
          minMaxLength: 'От 3 до 20 символов',
          uniqueChnlName: 'Должно быть уникальным',
        },
        modalBtn: {
          sendBtn: 'Отправить',
          cancelBtn: 'Отменить',
          removeBtn: 'Удалить',
        },
        addChannelModal: {
          modalTitle: 'Добавить канал',
          modalInput: 'Введите имя канала',
          inputLabel: 'Имя канала',
        },
        renameModal: {
          modalTitle: 'Переименовать канал',
          modalInput: 'Введите имя канала',
          inputLabel: 'Имя канала',
        },
        removeModal: {
          modalTitle: 'Удалить канал',
          removeQuestion: 'Уверены?',
        },
        toastNotification: {
          createToast: 'Канал создан',
          renameToast: 'Канал переименован',
          removeToast: 'Канал удален',
        },
      },
    },
  },
};

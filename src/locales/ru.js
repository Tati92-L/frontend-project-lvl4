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
        errorMessageLogin: 'Имя пользователя или пароль некорректны',
        loginBtn: 'Войти',
        noAccount: 'Нет аккаунта?',
        registrationLink: 'Регистрация',
        loginValidation: {
          nameMinValid: 'Не менее 3 символов',
          nameMaxValid: 'Не больше 20 символов',
          requiredName: 'Имя пользователя не указано',
          passwordMinValid: 'Не менее 6 символов',
          requiredPassword: 'Пароль не указан',
        },
        loginForm: {
          usernameLogin: 'Ваш ник',
          passwordLogin: 'Пароль',
        },
      },
      signUpPage: {
        signUpTitle: 'Регистрация',
        errorMessageSignUp: 'Пользователь с таким именем уже существует!',
        signUpBtn: 'Зарегестрироваться',
        signUpValidation: {
          nameMinValid: 'Не менее 3 символов',
          nameMaxValid: 'Не больше 20 символов',
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
          modalMin: 'Не менее 3 символов',
          modalMax: 'Не более 20 символов',
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
      },
    },
  },
};

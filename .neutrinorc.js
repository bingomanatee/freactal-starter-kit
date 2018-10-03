const dotenv = require('dotenv');

const envs = {
  development: '.env.development',
  production: '.env.production',
  staging: '.env.staging',
};

const env = process.env.NODE_ENV || 'development';
((path) => {
  dotenv.config({
    path
  });
})(envs[env]);

const uses = [
  [
    '@neutrinojs/react',
    {
      html: {
        title: 'freactal-loader',
        links: [
          'https://fonts.googleapis.com/icon?family=Material+Icons'
          , "https://fonts.googleapis.com/css?family=Roboto"
          , 'https://use.fontawesome.com/releases/v5.2.0/css/all.css'
        ]
      }
    }
  ],
  ['@neutrinojs/env',
    [
      'NODE_ENV',
      'AUTH0_CLIENT_ID',
      'AUTH0_DOMAIN',
      'UI_URL',
      'ADMIN_MODE',
      'ADMIN_API_URL'
    ]
  ]
];

if (!process.env.ADMIN_MODE) {
  uses.unshift(
    ['@neutrinojs/airbnb',
      {
        eslint: {
          "rules": {
            "import/extensions": 0,
            "react/prop-types": "off",
            "no-underscore-dangle": "off",
            'no-param-reassign': 'off',
            'class-methods-use-this': 'warn',
            "no-console": "warn",
            'no-plusplus': 'off',
            'no-unused-vars': 'warn',
            'prefer-destructuring': 'off',
            'prefer-template': 'warn',
            'react/prefer-stateless-function': 'warn',
            'react/jsx-closing-tag-location': 'warn'
          }
        }
      }
    ]
  );
  uses.push(['@neutrinojs/jest',
    {'setupFiles': ['raf/polyfill']}
  ])
}
else {
  console.log('ADMIN MODE');
}

module.exports = {
  use: uses
};

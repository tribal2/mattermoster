# Mattermoster (mattermoster)
Mattermoster is a Node.js + Express base API for Mattermost slash command integrations.

[Mattermost](https://about.mattermost.com/) is an Open source, private cloud Slack-alternative.

### Features
  - Plugin extendable
  - i18n ready
  - Open source!

## Installation

### Clone this project...

```sh
$ git clone https://github.com/swordf1zh/mattermoster-base.git
$ cd mattermoster-base
$ npm install
```

### ...or setup your own project

```sh
$ mkdir mattermoster-api-server
$ cd mattermoster-api-server
$ npm init --yes
$ npm install --save mattermoster
```

Create *index.js* in your root folder and add this code:

```js
const MattermosterClass = require('mattermoster');

/**
 * Mattermoster API instance
 */
const mattermoster = new MattermosterClass;
// Use i18n if you want to change API language:
// const mattermoster = new MattermosterClass('es');

/**
 * INSTALL PLUGINS HERE
 *
 * Eg:
 * const todoPlugin = require('mattermoster-todo-plugin');
 * const pluginEndpoint = '/todo';
 * mattermoster.addPlugin(pluginEndpoint, todoPlugin);
 */

/**
 * Run the server
 */
mattermoster.init();
```

### Run your project

```sh
$ node index.js
```

You can supply a different port number for your server (defaults to 3000):

```sh
$ node index.js 12345
```

### Test base endpoints

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Plugins

Mattermoster is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | Description |
| ------ | ------ |
| [Todo](https://github.com/swordf1zh/mattermoster-todo-plugin/blob/master/README.md) | ToDo plugin for Mattermoster based on Node.js + Express + MySQL. |

## Development

Want to contribute? Great, we are waiting for your PRs.

### Todos

 - Write Tests
 - Add Mattermost slash command setup instructions
 - Add troubleshooting

## License

MIT


**Free Software, Hell Yeah!**
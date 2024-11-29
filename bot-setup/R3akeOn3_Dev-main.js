// $#=- Code written by: R3akeOn3_ / imo.r3akeoneee (on discord) -=#$
// $#=- Do not publish modified versions of the code without the owner's consent. -=#$
// $#=- Check README.md in the bot folder, for more info. -=#

// $#=- If you see any incompatible elements or bugs, dm to me on discord, Thanks -=#$

const mineflayer = require("mineflayer");
const { pathfinder, goals } = require('mineflayer-pathfinder')
const chalk = require("chalk");
const { readFile } = require("fs/promises");

let botArgs = {};

function getPolishTime() {
    const now = new Date();
    return now.toLocaleString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
}
const AsciiLogo = `
           :::::::::   ::::::::      :::     :::    ::: :::::::::: ::::::::  ::::    :::  :::::::: 
          :+:    :+: :+:    :+:   :+: :+:   :+:   :+:  :+:       :+:    :+: :+:+:   :+: :+:    :+: 
         +:+    +:+        +:+  +:+   +:+  +:+  +:+   +:+       +:+    +:+ :+:+:+  +:+        +:+  
        +#++:++#:      +#++:  +#++:++#++: +#++:++    +#++:++#  +#+    +:+ +#+ +:+ +#+     +#++:    
       +#+    +#+        +#+ +#+     +#+ +#+  +#+   +#+       +#+    +#+ +#+  +#+#+#        +#+    
      #+#    #+# #+#    #+# #+#     #+# #+#   #+#  #+#       #+#    #+# #+#   #+#+# #+#    #+#     
     ###    ###  ########  ###     ### ###    ### ########## ########  ###    ####  ######## `;
                const AsciiLogoDev = `
          :::::::::  :::::::::: :::     :::       :::     :::   :::        :::::::      Thanks to Eglijohn
         :+:    :+: :+:        :+:     :+:       :+:     :+: :+:+:       :+:   :+:
        +:+    +:+ +:+        +:+     +:+       +:+     +:+   +:+       +:+   +:+       
       +#+    +:+ +#++:++#   +#+     +:+       +#+     +:+   +#+       +#+   +:+   
      +#+    +#+ +#+         +#+   +#+         +#+   +#+    +#+       +#+   +#+     
     #+#    #+# #+#          #+#+#+#           #+#+#+#     #+#   #+# #+#   #+#     
    #########  ##########     ###               ###     ####### ###  #######       
                `;
                console.log(chalk.blue(AsciiLogo));
                console.log(chalk.blueBright(AsciiLogoDev));
                console.log(chalk.rgb(102, 178, 255)(`Made by: R3akeOn3_                                                                   Version V1.0`));
                console.log(chalk.rgb(102, 178, 255)(`My Github: https://github.com/R3akeOn3/R3akeOn3_Dev \n`));

async function readConfigFile() {
    try {
        const data = await readFile('./config/CONFIG.json', 'utf8');
        const config = JSON.parse(data);
        botArgs.host = config.host;
        botArgs.auth = config.auth;
        botArgs.username = config.username;
        botArgs.port = config.needsPort ? config.port : undefined;
        owner = config.owner;
    } catch (error) {
        console.error(chalk.red('Error reading or parsing CONFIG.json:'), error);
        process.exit(1);
    }
}

class R3akeOn3_Dev {
    constructor() {
        this.username = botArgs.username;
        this.auth = botArgs.auth;
        this.host = botArgs.host;
        this.port = botArgs.port;
        this.version = botArgs.version;

        this.initBot();
    }

    initBot() {
        this.bot = mineflayer.createBot({
            username: this.username,
            auth: this.auth,
            host: this.host,
            port: this.port,
            version: this.version
        });
        this.initEvents();
    }
    initEvents() {
        this.logoDisplayed = false;

        this.bot.once('login', () => {
            let botSocket = this.bot._client.socket;
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 153, 0)('Message')}] Logged in to ${botSocket.server || botSocket._host} : ${botArgs.port}`);
        });
        //look at
        this.bot.on("move", () => {
            let targetplayer = this.bot.nearestEntity(entity => entity.type === 'player');
            if (targetplayer){
                this.bot.lookAt(targetplayer.position.offset(0, targetplayer.height, 0))
          }});
          this.bot.on('entitySpawn', (entity) => {
            if (entity.type === 'player' && entity.username !== this.bot.username) {
              console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.yellow('Info')}] - Players in my view: ${entity.username}`);
            }
          });
        // spawn log
        this.bot.loadPlugin(pathfinder);

        this.bot.once('spawn', () => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 153, 0)('Message')}] ${this.bot.username} Spawned at coords ${this.bot.entity.position} with healt ${this.bot.health}.`);
        });
        // respawn log
        this.bot.on('respawn', () => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 153, 0)('Message')}] - Respawn Coords: ${this.bot.entity.position}`);
        });
        // health update
        this.bot.on('health', () => {
            if (this.bot.health < 20) {  
                console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.yellow('Warn')}] - Health Update / Current health: ${Math.round(this.bot.health * 2) / 2}`);
            }
        });
        //player join / left
        this.bot.on('playerJoined', (player) => {
            console.log(`[${chalk.gray(`${getPolishTime()}`)}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(3, 219, 0)(`Info`)}] - [${player.username}]: [${chalk.bold.green(`+`)}${chalk.white(`] Join the server`)}`);
                })
        this.bot.on('playerLeft', (player) => {
            console.log(`[${chalk.gray(`${getPolishTime()}`)}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(3, 219, 0)(`Info`)}] - [${player.username}]: [${chalk.bold.red(`-`)}${chalk.white(`] Left the server`)}`);
                    })
        // entity dead / bot death
        this.bot.on('entityDead', (entity) => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.yellow('Warn')}] - Entity ${(entity.name)} Died.`);
        });
        this.bot.on('death', () => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(204, 102, 0)('Warn')}] - [${this.bot.username}] Died.`);
        })
        // error / end / kick
        this.bot.on('error', (err) => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.red('Error')}] - Bot ${err}.`);
        });
        this.bot.on('kick', () => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.red('Error')}] - Bot was kicked.`);
        });
        this.bot.on('end', () => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.red('Error')}] - Bot End.`);
            setTimeout(() => {
                this.initBot();
            }, 5000);
        });
        // chat logs
        this.bot.on('chat', (username, message) => {
            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] - <Chat> [${username}]: ${message}`);
        });
        // whisper commands
        this.bot.on('whisper', (username, message) => {

            let msg = message.toString();

            if (msg.startsWith("!help")) {
                console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] - ${username} used !help command.`);
                this.bot.chat(`/msg ${username} prefix = !`)
                this.bot.chat(`/msg ${username} help, info, clearinv`)

            }  else if (msg.startsWith("!quit")) {
                    if (username !== owner && username !== 'R3akeOn3_') {
                        this.bot.chat(`/msg ${username} You are not ${owner}`); 
                            return;
                        }

                        this.bot.chat(`/msg ${username} > Okay quitting.`);
                        console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] - ${username} used !quit command.`);
                        this.bot.quit();

            }  else if (msg.startsWith("!info")) {
                if (username !== owner && username !== 'R3akeOn3_') {
                    this.bot.chat(`/msg ${username} You are not ${owner}`); 
                        return;
                    }

                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] - ${username} used !info command.`);
                    this.bot.chat(`/msg ${username} My Coords: ${this.bot.position}`);
                    this.bot.chat(`/msg ${username} Health: ${Math.round(this.bot.health * 2) / 2}`);

                 } if (msg.startsWith("!clearinv")) {
                console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] - ${username} used !clearinv command.`);
            
                const clearInventory = async () => {
                    const items = this.bot.inventory.items();
                    
                    if (items.length === 0) {
                        this.bot.chat(`/msg ${username} I dont have any items.`);
                        return;
                    }

                    const tossItemWithDelay = async (item, delay) => {
                        try {
                            await new Promise(resolve => setTimeout(resolve, delay));
                            await this.bot.tossStack(item);
                            console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Dropped: ${item.name}`);
                        } catch (err) {
                            console.error(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.red('Error')}] Error with dropping ${err}`);
                        }
                    };
                    const delay = 200;
                    for (const item of items) {
                        await tossItemWithDelay(item, delay);
                    }  
                    this.bot.chat(`/msg ${username} Every item was dropped.`);
                }; 
                clearInventory();
                }});
              }
              
              
            //cmd commands
              async executeCommand(command) {
            
                switch (command.toLowerCase()) {
                case 'info':
                    await new Promise(resolve => setTimeout(resolve, 10));
                    // serwer info \\
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 153, 0)('Message')}] - Serwer Info:`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Host: ${botArgs.host}`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Port: ${botArgs.port}`);
                    // client info \\
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 153, 0)('Message')}] - Client Info:`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Username: ${this.bot.username}`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Helath: ${Math.round(this.bot.health * 2) / 2}`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Food: ${Math.round(this.bot.food * 2) / 2}`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] XP Points: ${this.bot.experience.points}`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Difficulty: ${this.bot.game.difficulty}`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Gamemode: ${this.bot.game.gameMode}`);
                    console.log(`[${chalk.gray(getPolishTime())}] [${chalk.blue(this.bot.username)}] [${chalk.rgb(0, 204, 0)('Info')}] Position: ${this.bot.entity.position}`);
                    break;
                case 'slot':
                    await new Promise(resolve => setTimeout(resolve, 10));
                    
                        break;
                  default:
                    console.log(`Unknown command: ${command}`);
                    break;
                }
              }
              
              //input
              async handleInput() {
                for await (const data of process.stdin) {
                  const input = data.toString().trim();
                  if (input.startsWith('!')) {
                    const command = input.substring(1);
                    await this.executeCommand(command);
                  } else {
                    this.bot.chat(`${input}`);
                  };
                };
              };
            }
        
            async function initializeBot() {
              await readConfigFile();
              const botInstance = new R3akeOn3_Dev();
              botInstance.handleInput().catch(console.error);
            }
            
            initializeBot();
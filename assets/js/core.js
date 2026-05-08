// JavaScript Document

var game = new Phaser.Game (850, 1334, Phaser.AUTO, 'game');
game.state.add ('main', mainGameState);
game.state.start ('main');

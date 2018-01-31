/* global __dirname, process */

'use strict';
var fs = require('fs');
var i18n   = require(__dirname + '/lib/lang');    
var logger = require(__dirname + '/lib/logger');
var config = require(__dirname + '/lib/config');
var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot(config.telegram.botToken, { polling: false });

var groupId = config.bot.notifyId;

console.log('flag');

//var movie_id = process.env.radarr_movie_id || i18n.__('botNotifyMovieUnknowId');
var movie_title   = process.env.radarr_movie_title || i18n.__('botNotifyMovieUnknowTitle');
//var movie_path = process.env.radarr_movie_path || i18n.__('botNotifyMovieUnknowPath');
var movie_imdbid = process.env.radarr_movie_imdbid || i18n.__('botNotifyMovieUnknowimdbId');
//var movie_relYear = process.env.radarr_movie_year;
//var movie_id = process.env.radarr_movie_id || i18n.__("botNotifyEpisodeUnknowFileId");
//var movie_relativepath = process.env.radarr_movie_relativepath || i18n.__("botNotifyEpisodeUnknowRelativePath");
var target  = process.env.radarr_moviefile_path || i18n.__('botNotifyMovieUnknowPath');
//var season  = process.env.radarr_movie_seasonnumber || i18n.__("botNotifyEpisodeUnknowSeason");
//var episode = process.env.radarr_movie_episodenumbers || i18n.__("botNotifyEpisodeUnknowEpisode");
///var airdate = process.env.radarr_movie_episodeairdates || i18n.__("botNotifyEpisodeUnknowAirDates");
//var airdateutc = process.env.radarr_movie_episodeairdatesutc || i18n.__("botNotifyEpisodeUnknowUtcAirDates");
var quality = process.env.radarr_movie_quality || i18n.__('botNotifyMovieUnknowQuality');
//var qualityversion = process.env.radarr_movie_quality_version || i18n.__('botNotifyMovieUnknowQualityVersion');
//var releasegroup = process.env.radarr_movie_releasegroup || i18n.__('botNotifyEpisodeUnknowReleaseGroup');
//var source  = process.env.radarr_movie_scenename || i18n.__('botNotifyEpisodeUnknowName');
//var sourcepath = process.env.radarr_movie_sourcepath || i18n.__('botNotifyEpisodeUnknowSourcePath');
//var sourcefolder = process.env.radarr_movie_sourcefolder || i18n.__('botNotifyEpisodeUnknowSourceFolder');


var fileSizeInMegaBytes = 0;
try {
    var stats = fs.statSync(target);
    fileSizeInMegaBytes = Math.round((stats['size'] / 1048576) * 10) / 10;
}
catch (e) {
    logger.error('err:' + e);
}
var message = [];
message.push(i18n.__('botNotifyMovieImported'));
message.push(i18n.__('botNotifyMovieFormat', movie_title, movie_imdbid));
//message.push(i18n.__('botNotifyAirDate', airdate));
message.push(i18n.__('botNotifyQuality', quality));
message.push(i18n.__('botNotifySize', fileSizeInMegaBytes));

//message.push(i18n.__("botNotifyMovieID", movie_id));
//message.push(i18n.__("botNotifyPath", movie_path));
//message.push(i18n.__("botNotifyTvdbId", movie_tvdbid));
//message.push(i18n.__("botNotifyEpisodeId", episodefile_id));
//message.push(i18n.__("botNotifyRelPath", episodefile_relativepath));
//message.push(i18n.__("botNotifyAirDateUtc", airdateutc));
//message.push(i18n.__("botNotifyQualityVersion", qualityversion));
//message.push(i18n.__("botNotifyReleaseGroup", releasegroup));
//message.push(i18n.__("botNotifySource", source));
//message.push(i18n.__("botNotifySourcePath", sourcepath));
//message.push(i18n.__("botNotifySource", sourcefolder));
//message.push(i18n.__("botNotifyDestination", target));

bot.sendMessage(groupId, message.join('\n'), {
    'disable_web_page_preview': true,
    'parse_mode': 'Markdown',
    'selective': 2
});

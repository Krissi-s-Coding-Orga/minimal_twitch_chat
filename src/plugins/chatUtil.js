import axios from "axios"

let channelBadges = {}
let globalBadges = {}

export default { getBadgeUrl, parseComponents, retrieveBadges }

async function retrieveBadges(roomId) {
    if (channelBadges.length > 0 ||
        globalBadges.length > 0) {
        return 
    }
    await getChannelBadges(roomId)
    await getGlobalBadges()
}

function parseComponents(message, userstate) {
    const components = []
    const messageFragments = message.split(' ')
    for(let index in messageFragments) {
        let messageFragment = messageFragments[index]
        let emote = getEmote(messageFragment, message, userstate)
        if(typeof(emote) !== 'undefined') {
            components.push({
                type: 'image',
                data: 'https://static-cdn.jtvnw.net/emoticons/v2/' + emote + '/default/dark/2.0'
            })
        } else if(messageFragment.startsWith('http://') || messageFragment.startsWith('https://')){
            components.push({
                type: 'url',
                data: messageFragment.trim()
            })
        } else {
            components.push({
                type: 'text',
                data: messageFragment
            })
        }
    }
    return components
}

function getBadgeUrl(badgeType, badgeData) {
    if(typeof(channelBadges.badge_sets[badgeType]) !== 'undefined') {
        let badgets = channelBadges.badge_sets[badgeType].versions
        if(typeof(badgets) === 'undefined') {
            badgets = channelBadges.badge_sets[badgeType]
        }
        if(typeof(badgets[badgeData]) !== 'undefined') { 
            return badgets[badgeData].image_url_2x
        }
    }
    if(typeof(globalBadges.badge_sets[badgeType]) !== 'undefined') {
        let badgets = globalBadges.badge_sets[badgeType].versions
        return badgets[badgeData].image_url_2x
    }
}

function getEmote(messageFragment, message, userstate) {
    for(let emoteId in userstate.emotes) {
        let emotePosition = userstate.emotes[emoteId][0].split('-')
        if(message.indexOf(messageFragment) === Number(emotePosition[0])) {
            return emoteId
        }
    }
    return
}

async function getChannelBadges(roomId) {
    let requestBadges = await axios(`https://badges.twitch.tv/v1/badges/channels/${roomId}/display?language=en`)
    channelBadges = requestBadges.data
}

async function getGlobalBadges() {
    let requestBadges = await axios(`https://badges.twitch.tv/v1/badges/global/display`)
    globalBadges = requestBadges.data
}
const cleanedTrack = (trackName) => {

    // Regular expression to match text starting with special characters or containing emojis
    const regex = /[^A-Za-z0-9\s!@#\$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?~]*|[\p{Emoji}]/gu;
    const regex1 = /\([^)]*\)|\[[^\]]*\]/g;
    // Remove text starting with special characters or containing emojis
    const textWithCleanedEmoji = trackName?.replace(regex,'');
    // Remove text starting with special characters or containing emojis
    const textWithCleanSpclChar = textWithCleanedEmoji?.replace(regex1,'').replace(/\s+/g, ' ').trim();

    return textWithCleanSpclChar;
    
}

module.exports = cleanedTrack;
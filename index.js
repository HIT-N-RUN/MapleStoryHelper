import fetch from "node-fetch";

class FetchManager {
  static RequestMap = {}

  static Fetch = async (url='', ) => {

  }
}

class MapleGG {
  static URL = {
    BASE: `https://maple.gg`,
    PROFILE: (characterName) => [this.URL.BASE, 'u', characterName].join('/') // `https://maple.gg/u/${characterName}`
  }

  static getProfile = async (characterName) => {
    const fetchURL = this.URL.PROFILE(characterName);
    const response = await fetch(fetchURL);
    const body = await response.text();

    const avatarRe = /"og:image" content="(.*?)"\/>/;
    const avatarURL = body.match(avatarRe)[1];
  
    const towerRe = /최고무릉:(.*?)층\((.*?)분 (.*?)초\),최고/;
    const towerReResult = body.match(towerRe);
    const towerData = {
      tier: towerReResult[1],
      min: towerReResult[2],
      sec: towerReResult[3],
    };
  
    const seedRe = /최고시드:(.*?)층\((.*?)분 (.*?)초\),유니온/;
    const seedReResult = body.match(seedRe);
    const seedData = {
      tier: seedReResult[1],
      min: seedReResult[2],
      sec: seedReResult[3],
    };
  
    const unionRe = /user-summary-level">Lv.(.*?)<\/span>/;
    const unionReResult = body.match(unionRe);
    const unionData = {
      summary: unionReResult[1],
    };
  
    return {
      avatar: avatarURL,
      tower: towerData,
      seed: seedData,
      union: unionData,
    };
  }
}

// export default MapleGG;
export default MapleGG;
// export {
//   MapleGG.getProfile as default
// };

// module.exports = MapleGG.getProfile;

// // module.getProfile = MapleGG.getProfile;
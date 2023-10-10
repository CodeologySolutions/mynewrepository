import instance from "./axios-api";
import routes from "./routes";
import * as generalSetting from './generalSetting';
import { saveDataToLocalStorage,retrieveDataFromLocalStorage } from '../appUtils/sessionManager';
import { Constants } from '../appUtils/constants';
let authUrl= generalSetting.API_URL+'auth/';
let apiUrl= generalSetting.API_URL;
let publicUrl= generalSetting.API_URL+'public/';
let accountUrl= generalSetting.API_URL+'account/';
export const signIn = (data) => {
    return instance.post(`${authUrl}${routes.signin}`, data)
    .then(res => {
        return res;
    })
};

export const signInInternational = (data) => {
  return instance.post(`${authUrl}${routes.signinInternational}`, data)
  .then(res => {
      return res;
  })
};
export const signUpInternational = (data) => {
  return instance.post(`${authUrl}${routes.signupInternational}`, data)
  .then(res => {
      return res;
  })
};
export const getCategories = (data) => {
  return instance.post(`${publicUrl}${routes.getCategories}`, data)
  .then(res => {
      return res;
  })
};
export const getGeoDistance = (data) => {
  return instance.post(`${publicUrl}${routes.getDistance}`, data)
  .then(res => {
      return res;
  })
};
export const getGeoLocation = (data) => {
  return instance.post(`${publicUrl}${routes.getGeoLocation}`, data)
  .then(res => {
      return res;
  })
};
export const getBanners = (data) => {
  return instance.post(`${publicUrl}${routes.getBanners}`, data)
  .then(res => {
      return res;
  })
};

export const getTempleByCategory = (data) => {
  return instance.post(`${publicUrl}${routes.getTempleByCategory}`, data)
  .then(res => {
      return res;
  })
};

export const getNewsEvents = (data) => {
  return instance.post(`${publicUrl}${routes.getNewsEvents}`, data)
  .then(res => {
      return res;
  })
};
export const getTemplePujas = (data) => {
  return instance.post(`${publicUrl}${routes.getTemplePujas}`, data)
  .then(res => {
      return res;
  })
};
export const getStotras = (data) => {
  return instance.post(`${publicUrl}${routes.getStotras}`, data)
  .then(res => {
      return res;
  })
};
export const getSearchResult = (data) => {
  return instance.post(`${publicUrl}${routes.getSearchResult}`, data)
  .then(res => {
      return res;
  })
};
export const getVideos = (data) => {
  return instance.post(`${publicUrl}${routes.getVideos}`, data)
  .then(res => {
      return res;
  })
};

export const getStotraDetails = (id) => {
  return instance.post(`${publicUrl}${routes.getStotraDetails}${id}`)
    .then((res) => {
      return res;
    });
};
export const getTempleDetails = (id) => {
  return instance.post(`${publicUrl}${routes.getTempleDetails}${id}`)
    .then((res) => {
      return res;
    });
};
export const getPanchang = (data) => {
  return instance.post(`${publicUrl}${routes.getPanchang}`, data)
    .then((res) => {
      return res;
    });
};
export const getAllStateList = (data) => {
    return instance.post(`${publicUrl}${routes.stateList}`, data)
    .then(res => {
        return res;
    })
};

export const getAllFreeAvatar = (data) => {
    return instance.post(`${apiUrl}${routes.avatarFree}`, data)
    .then(res => {
        return res;
    })
};

export const getsignUpCode = (data) => {
    return instance.post(`${publicUrl}${routes.signupCode}`, data)
    .then(res => {
        return res;
    })
};

export const countryList = (data) => {
  return instance.post(`${publicUrl}${routes.countries}`, data)
  .then(res => {
      return res;
  })
};

export const PrivacyData = (data) => {
  return instance.post(`${publicUrl}${routes.privacy}`)
  .then(res => {
      return res;
  })
};

export const TermsData = (data) => {
  return instance.post(`${publicUrl}${routes.terms}`)
  .then(res => {
      return res;
  })
};

// export const allGames = (data) => {
//   return instance.post(`${url.gamesUrl}${routes.list}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const gameTypes = (data) => {
//   return instance.post(`${url.gamesTypesUrl}${routes.list}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getTournamentList = (data) => {
//   return instance.post(`${url.eventUrl}${routes.list}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const homebanner = (data) => {
//   return instance.post(`${url.bannerUrl}${routes.list}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getevents = (id) => {
//   return instance.post(`${url.eventListUrl}${routes.get}${id}`)
//     .then((res) => {
//       return res;
//     });
// };

// export const getWalletLimit = (data) => {
//   return instance.post(`${url.accountUrl}${routes.walletusage}`, data)
//     .then((res) => {
//       return res;
//     });
// };
export const saveUserAddress = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.saveUserAddress}`,data)
    .then((res) => {
      return res;
    });
};
export const getUserAddressList = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.getUserAddressList}`,data)
    .then((res) => {
      return res;
    });
};
export const getTempleUserFavouriteList = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.getFavouriteList}`,data)
    .then((res) => {
      return res;
    });
};
export const getTempleUserFavourite = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.getFavourite}`,data)
    .then((res) => {
      return res;
    });
};
export const setTempleUserFavourite = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.setFavourite}`,data)
    .then((res) => {
      return res;
    });
};
export const getUserProfile = async () => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.profile}`)
    .then((res) => {
      return res;
    });
};
// export const getOtherUserProfile = (data) => {
//   return instance.post(`${url.accountUrl}${routes.profile}`,data)
//     .then((res) => {
//       return res;
//     });
// };
// export const removeFolowUser = (data) => {
//   return instance.post(`${url.accountUrl}${routes.followUser}`,data)
//     .then((res) => {
//       return res;
//     });
// };
// export const onCreateContest = (data) => {
//   return instance.post(`${apiUrl}${routes.createContest}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getContestList = (data) => {
//   return instance.post(`${apiUrl}${routes.contestlist}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const getContestDetails = (id) => {
//   return instance.post(`${url.contestUrl}${routes.get}${id}`)
//     .then((res) => {
//       return res;
//     });
// };
// export const getContestEventByCode = (data) => {
//   return instance.post(`${url.accountUrl}${routes.contesteventbycode}`, data)
//     .then((res) => {
//       return res;
//     });
// };


// export const getContestMyList = (data) => {
//   return instance.post(`${url.contestUrl}${routes.mylist}`, data)
//     .then((res) => {
//       return res;
//     });
// };

export const getUpdateProfile = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.updateprofile}`, data)
    .then((res) => {
      return res;
    });
};
export const updateProfilePic = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.updateprofilepic}`, data)
    .then((res) => {
      return res;
    });
};
export const saveUserTempleImage = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.saveUserTempleImage}`, data)
    .then((res) => {
      return res;
    });
};

export const getUserTempleImageList = async (data) => {
  var token  = await retrieveDataFromLocalStorage(Constants.key_token);

  instance.defaults.headers.post['x-access-token'] = JSON.parse(token);
  return instance.post(`${accountUrl}${routes.getUserTempleImageList}`, data)
    .then((res) => {
      return res;
    });
};
// export const getDailyRewards = (data) => {
//   return instance.post(`${url.accountUrl}${routes.dailyreward}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getListofDailyRewards = (data) => {
//   return instance.post(`${apiUrl}${routes.listdailyreward}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getCollectDailyRewards = (data) => {
//   return instance.post(`${url.accountUrl}${routes.collectdailyreward}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getCoinStoreList = (data) => {
//   return instance.post(`${apiUrl}${routes.coinStoreList}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const getCoinStoreDetails = (id) => {
//   return instance.post(`${apiUrl}${routes.coinStoreGet}${id}`)
//     .then((res) => {
//       return res;
//     });
// };
// export const requestCreateCoinStoreTransactions = (data) => {
//   return instance.post(`${apiUrl}${routes.createRazTransaction}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const requestCreateCFCoinStoreTransactions = (data) => {
//   return instance.post(`${apiUrl}${routes.createCashfreeTransaction}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const requestLevelList = (data) => {
//   return instance.post(`${apiUrl}${routes.levelsList}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const requestGameStats = (data) => {
//   return instance.post(`${apiUrl}${routes.gameStatistics}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getAllAvatarList = (data) => {
//   return instance.post(`${apiUrl}${routes.avatarList}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getAllRewardCategoryList = (data) => {
//   return instance.post(`${apiUrl}${routes.rewardCatList}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getAllRewardProductMyList = (data) => {
//   return instance.post(`${apiUrl}${routes.rewardProdMyList}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getAllLeaderboardsList = (data) => {
//   return instance.post(`${apiUrl}${routes.leaderboardsList}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const howToJoinGame = (data) => {
//   return instance.post(`${apiUrl}${routes.howToJoin}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getMyContestList = (data) => {
//   return instance.post(`${apiUrl}${routes.myContestList}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getMyEventsList = (data) => {
//   return instance.post(`${apiUrl}${routes.myEventsList}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getLeaderBoardList = (type, data) => {
//   return instance.post(`${url.accountUrl}${routes.leaderboard}${type}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getSearchUserList = (  data) => {
//   return instance.post(`${apiUrl}${routes.searchUserList}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const getCollegeList = (  data) => {
//   return instance.post(`${apiUrl}${routes.collegeList}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getApplyReward = (data) => {
//   return instance.post(`${url.accountUrl}${routes.applyReward}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const getClientSecret = (data) => {
//   return instance.post(`${url.accountUrl}${routes.createPaymentIntent}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const createStripeTransactionWeb = (data) => {
//   return instance.post(`${url.accountUrl}${routes.createStripeTransactionWeb}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const createStripePaymentIntentWeb = (data) => {
//   return instance.post(`${url.accountUrl}${routes.createStripePaymentIntentWeb}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const getBuyAvatar = (data) => {
//   return instance.post(`${url.accountUrl}${routes.buyAvatar}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getAllPoints = (data) => {
//   return instance.post(`${apiUrl}${routes.allPoints}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getAllPointsCategory = (data) => {
//   return instance.post(`${apiUrl}${routes.allPointsCategories}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getContestRate = (data) => {
//   return instance.post(`${url.accountUrl}${routes.contestRate}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getApplyEventCode = (data) => {
//   return instance.post(`${url.accountUrl}${routes.applyEventCode}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getTicketLists = (data) => {
//   return instance.post(`${apiUrl}${routes.ticketList}`, data)
//   .then((res) => {
//     return res;
//   });
// };

// export const getGamesDetails = (id) => {
//   return instance.post(`${url.gamesUrl}${routes.get}${id}`)
//     .then((res) => {
//       return res;
//     });
// };

// export const getCategoryLists = (data) => {
//   return instance.post(`${apiUrl}${routes.categoryList}`, data)
//   .then((res) => {
//     return res;
//   });
// };

// export const getRankSummeryByGame = (data) => {
//   return instance.post(`${url.accountUrl}${routes.rankSummeryByGame}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getSearchGames = (data) => {
//   return instance.post(`${apiUrl}${routes.searchGames}`, data)
//   .then((res) => {
//     return res;
//   });
// };

// export const getContestByGame = (data) => {
//   return instance.post(`${url.accountUrl}${routes.contestByGame}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const getFollowingList = ( data) => {
//   return instance.post(`${url.accountUrl}${routes.followings}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const getFollowerList = ( data) => {
//   return instance.post(`${url.accountUrl}${routes.followers}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getUploadSS = (data) => {
//   return instance.post(`${apiUrl}${routes.uploadSS}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getCreateComplaint = (data) => {
//   return instance.post(`${apiUrl}${routes.createTicket}`, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getAllTicketChat = (data) => {
//   return instance.post(`${apiUrl}${routes.getTicketChat}${data}`, {})
//     .then((res) => {
//       return res;
//     });
// };

// export const updateAllTicketChat = (id, data) => {
//   return instance.post(`${apiUrl}${routes.updateTicketChat}${id}`, data)
//     .then((res) => {
//       return res;
//     });
// };
// export const checkUserDetails = (data) => {
//   return instance.post(`${url.usersUrl}${routes.checkUser} `, data)
//     .then((res) => {
//       return res;
//     });
// };

// export const getGenrateSignature = (data) => {
//   return instance.post('https://www.gamerji.com/signature.php', data)
//     .then((res) => {
//       return res;
//     });
// };

// export const onSignUp = (data) => {
//   return instance.post(`${authUrl}${routes.signup}`, data)
//     .then((res) => {
//       return res;
//     });
// };

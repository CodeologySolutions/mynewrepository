import { Dimensions } from "react-native";

export class Constants {

    static dummy_txt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehend in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non roident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    // Integer Strings 
    static INT_OTP_TIMEOUT = 30;

    // Integer Strings 
    static app_name = 'Tap';

    // Success Strings 
    static success_log_in = 'You\'re successfully logged in.';
    static success_video_submitted = 'Video submitted successfully.';
    static success_promo_code_applied = 'Promo code applied successfully.';
    static success_streamer_request = 'Streamer request submitted successfully.';
    static success_withdrawal = 'You have successfully withdraw money.';
    static success_profile_updated = 'Profile has been successfully updated.';
    static success_email_updated = 'Email updated successfully.';
    static success_favorite_games_updated = 'Favorite games updated successfully.';

    // Validation Strings 
    static validation_mobile_no = 'Enter mobile number';
    static validation_invalid_mobile_no = 'Invalid mobile number';
    static validation_email = 'Enter email';
    static validation_gamerjiname = 'Enter Gamerji Username';
    static validation_account_number = 'Enter Account Number';
    static validation_account_holders_name = 'Enter Account Holder’s Name';
    static validation_bank_name = 'Enter Bank Name';
    static validation_branch = 'Enter Branch';
    static validation_ifsc_code = 'Enter IFSC Code';
    static validation_pan_number = 'Enter PAN Number';
    static validation_date_of_birth = 'Select Date of Birth';
    static validation_state = 'Select State';
    static validation_repeat_account_number = 'Enter Repeat Account Number';
    static validation_upi_id = 'Enter UPI ID';
    static validation_repeat_upi_id = 'Enter Repeat UPI ID';
    static validation_card_number = 'Enter Card Number';
    static validation_expiry_date = 'Enter Expiry Date';
    static validation_cvv = 'Enter CVV';
    static validation_card_holder_name = 'Enter Card Holder Name';
    static validation_search_by_bank_name = 'Search by Bank Name';
    static validation_upi_address = 'Enter UPI Address';
    static validation_amount = 'Enter Amount';
    static validation_promo_code = 'Enter Promo Code';
    static validation_video_title = 'Enter Video Title';
    static validation_video_link = 'Enter Video Link';
    static validation_name = 'Enter Name';
    static validation_youtube_channel_name = 'Enter Youtube Channel Name';
    static validation_youtube_channel_link = 'Enter Youtube Channel Link';
    static validation_select_state = 'Select State';
    static validation_select_date_of_birth = 'Select Date of Birth';
    static validation_invite_code = 'Enter Invite Code';

    // Error Validation Strings 
    static error_enter_mobile_no = 'Please Enter Mobile No';
    static error_enter_valid_mobile_no = 'Please Enter Valid Mobile No';
    static error_enter_amount = 'Please Enter Amount';
    static error_enter_email = 'Please Enter Email';
    static error_enter_valid_email = 'Please Enter Valid Email';
    static error_field_is_required = 'This field is required';
    static error_enter_upi_address = 'Please Enter UPI Address';
    static error_enter_correct_upi_address = 'Please Enter Correct UPI Address';
    static error_enter_card_number = 'Please Enter Card Number';
    static error_enter_correct_card_number = 'Please Enter Valid Card Number';
    static error_enter_expiry_date = 'Please Enter Expiry Date';
    static error_enter_valid_expiry_date = 'Please Enter Valid Expiry Date';
    static error_month_not_zero = 'Month Cannot be 0';
    static error_enter_valid_month = 'Please Enter Valid Month';
    static error_enter_valid_year = 'Please Enter Valid Year';
    static error_enter_cvv = 'Please Enter CVV';
    static error_enter_correct_cvv = 'Please Enter Correct CVV';
    static error_enter_card_holder_name = 'Please Enter Card Holder Name';
    static error_enter_account_number = 'Please Enter Account Number';
    static error_enter_valid_account_number = 'Please Enter Valid Account Number';
    static error_enter_repeat_account_number = 'Please Enter Repeat Account Number';
    static error_enter_valid_repeat_account_number = 'Please Enter Valid Repeat Account Number';
    static error_account_number_and_repeat_account_number_not_matched = 'Account Number & Repeat Account Numbers Are Not Matched';
    static error_enter_bank_name = 'Please Enter Bank Name';
    static error_enter_ifsc_code = 'Please Enter IFSC Code';
    static error_enter_account_holder_name = 'Please Enter Account Holder Name';
    static error_enter_upi_id = 'Please Enter UPI Id';
    static error_enter_repeat_upi_id = 'Please Enter Repeat UPI Id';
    static error_enter_correct_upi_id = 'Please Enter Correct UPI Id';
    static error_enter_correct_repeat_upi_id = 'Please Enter Correct Repeat UPI Id';
    static error_upi_id_and_repeat_upi_id_not_matched = 'UPI Id & Repeat UPI Id Are Not Matched';
    static error_enter_promo_code = 'Please Enter Promo Code';
    static error_enter_video_title = 'Please Enter Video Title';
    static error_enter_video_link = 'Please Enter Video Link';
    static error_enter_name = 'Please Enter Name';
    static error_enter_youtube_channel_name = 'Please Enter Youtube Channel Name';
    static error_enter_youtube_channel_link = 'Please Enter Youtube Channel Link';
    static error_select_one_game = 'Please Select At Least One Game';
    static error_select_one_platform = 'Please Select At Least One Platform';
    static error_amount_should_not_zero = 'Amount should not be 0';
    static error_withdraw_more_than_the_winning_amount = 'You cannot withdraw more than winning amount';
    static error_minimum_withdrawal_amount = 'Minimum withdrawal amount is';
    static error_maximum_withdrawal_amount = 'Maximum withdrawal amount is';
    static error_select_payment_mode = 'Plese select the payment mode';
    static error_invalid_payment_mode = 'Payment mode not found';
    static error_verify_email_to_withdraw = 'Please verify your email to withdraw your winnings.';
    static error_select_date_of_birth = 'Please select date of birth';
    static error_select_state = 'Please select state';

    // Static Strings
    static text_country_code_india = '+91';
    static dummy_mobile_no = '+91 - 9898989898';

    static key_is_login = 'IsLogin';
    static key_token = 'Token';
    static key_username = 'Username';
    static key_countrycode = 'Countrycode';
    static key_user_data = 'UserData';
    static key_user_profile = 'UserProfile';


    // Screen Navigation Strings
    static nav_header = 'header';
    static nav_alarm = 'Alarm';
    static nav_add_alarm = 'AddAlarm';
    static nav_edit_alarm = 'EditAlarm';
    
    static nav_splash = 'splash';
    static nav_login = 'login';
    static nav_verify_phone = 'VerifyPhone';
    static nav_verify_code = 'VerifyCode';
    static nav_signup = 'signup';
    static nav_otp = 'otp';
    static nav_signup_otp = 'signnupotp';
    static nav_create_profile = 'createProfile';
    static nav_user_upgrade = 'UpgradeScreen';
    static nav_calendar = 'Calendar';
    static nav_update_profile_after_signUp = 'updateProfileAfterSignUp';
    static nav_reset_password = 'resetPassword';
    static nav_daily_login_rewards = 'dailyLoginRewards';
    static nav_bottom_navigation = 'bottomNavigation';
    static nav_game_type = 'gameType';
    static nav_html_game_type = 'htmlGameType';
    static nav_html_game = 'htmlGame';
    static nav_html_game_detail = 'htmlGameDetail';
    static nav_change_user_name = 'changeUserName';
    static nav_contest_list = 'contestList';
    static nav_contest_filter = 'contestFilter';
    static nav_join_contest_wallet_validation = 'joinContestWalletValidation';
    static nav_dob_state_validation = 'dobStateValidation';
    static nav_squad_registration = 'squadRegistration';
    static nav_contest_detail = 'contestDetail';
    static nav_wining_prize_pool = 'winingPrizePool';
    static nav_tournament_list = 'tournamentList';
    static nav_view_all_videos = 'viewAllVidoes';
    static nav_college_detail = 'collegeDetail';
    static nav_esports_news_details = 'esportsNewsDetails';
    static nav_insights_stats_screen = 'insightsStatsScreen'
    static nav_friend_list = 'friendList'
    static nav_my_rewards = 'myRewards'
    static nav_ticket_detail = 'ticketDetail'
    static nav_how_to_join = 'howToJoin'
    static nav_account_new = 'accountNew'
    static nav_coin_reward_store = 'coinRewardStore'
    static nav_payment_options_new = 'paymentOptionsNew'
    static nav_payment_by_card_list = 'paymentByCardList'
    static nav_net_banking_list = 'netBankingList'
    static nav_payment_gateway_new = 'paymentGatewayNew'
    static nav_world_of_esports_new = 'WorldOfEsports';


    // Bottom Navigation Menu Strings
    static nav_profile = 'Profile';
    static nav_home = 'Home';
    static nav_temple_list = 'TempleList';
    static nav_favourite_temple_list = 'FavouriteTempleList';
    static nav_temple_detail = 'TempleDetail';
    static nav_temple_map_detail = 'TempleMapDetail';
    static nav_stotra_list = 'StotraList';
    static nav_package_tour_list = 'PackageTourList';
    static nav_panchangam_list = 'PanchangamList';
    static nav_event_list = 'EventList';
    static nav_stotra_detail = 'StotraDetail';
    static nav_settings = 'Settings';
    
    static nav_all_games = 'All Games';
    static nav_college_leagues = 'College Leagues';
   
    static nav_world_of_esports = 'World of Esports';
    static nav_more = 'More';
    static nav_more_leaderboard = 'Leaderboard';
    static nav_more_join_via_invite_code = 'Join Via Invite Code';
    static nav_more_stream_on_gamerji = 'Stream on GamerJi';
    static nav_more_add_videos = 'Add Videos';
    static nav_more_notifications = 'Notifications';
    static nav_more_refer_a_friend = 'Refer A Friend';
    static nav_more_apply_promo_code = 'Apply Promo Code';
    static nav_more_how_to_play = 'How To Play';
    static nav_more_gamerji_points = 'GamerJi Points';
    static nav_more_customer_care = 'Customer Care';
    static nav_more_legality = 'Legality';
    static nav_more_terms_of_use = 'Terms & Conditions';
    static nav_more_privacy_policy = 'Privacy Policy';
    static nav_more_videos = 'Videos';
    static nav_more_logout = 'Logout';
    static nav_daily_login_rewards = 'Daily Login Rewards';
    static nav_account = 'Account';
    static nav_add_balance = 'Add Balance';
    static nav_my_recent_transactions = 'My Recent Transactions';
    static nav_withdrawal = 'Withdrawal';
    static nav_mobile_add_email_verification = 'Mobile & Email Verification';
    static nav_pan_verification = "PAN Verification";
    static nav_bank_verification = 'Bank Verification';
    static nav_bank_transfer = 'Bank Transfer';
    static nav_upi_transfer = 'UPI Transfer';
    static nav_verify_email = 'Verify Email';
    static nav_payment_options = 'Payment Options';
    static nav_payment_gateway = 'Payment Gateway';
    static nav_withdrawal_paytm = 'Withdrawal Paytm';
    static nav_tournament_detail = 'tournamentDetail';
    static nav_my_contests = 'myContests';
    static nav_single_contest_to_join = 'singleContestToJoin';
    static nav_single_tournament_to_join = 'SingleTournamentToJoin';
    static nav_raise_complaint = 'raiseComplaint';
    static nav_coin_store = 'coinStore';
    static nav_edit_profile = 'Edit Profile';
    static nav_search_user = 'Search User';

    static nav_view_all_medals = 'Medals';
    static nav_view_all_stats = 'Stats';
    static nav_view_all_featured_videos = 'Featured Videos';
    static nav_view_all_top_profiles = 'Top Profiles';
    static nav_view_all_esports_news = 'Esports News';
    static nav_chart = 'chart';
    static nav_profile_screen = 'profileScreen';
    static nav_other_user_profile = 'otherUserProfile'
    static nav_reward_store = 'rewardStore'

    // Header Strings
    static header_daily_login_rewards = 'Daily Login Rewards';
    static header_account = 'Account';
    static header_add_balance = 'Add Balance';
    static header_my_recent_transactions = 'My Recent Transactions';
    static header_withdrawal = 'Withdrawal';
    static header_mobile_add_email_verification = 'Mobile & Email';
    static header_pan_verification = "PAN";
    static header_bank_verification = 'Bank';
    static header_bank_transfer = 'Bank Transfer';
    static header_upi_transfer = 'UPI Transfer';
    static header_verify_email = 'Verify Email';
    static header_payment_options = 'Payment Options';
    static header_payment_gateway = 'Payment Gateway';
    static header_profile = 'Profile';
    static header_edit_profile = 'Edit Profile';
    static header_stats = 'Stats';
    static header_collegiate = 'Collegiate';
    static header_medals = 'Medals';
    static header_apply_promo_code = 'Apply Promo Code';
    static header_join_via_invite_code = 'Join Via Invite Code';
    static header_update_email = 'Update Email';
    static header_esports_news_details = 'Esports News Details';
    static header_videos = 'Videos';
    static header_my_videos = 'My Videos';

    // Text Strings
    static text_esports_header = 'India\'s only eSports';
    static text_esports_sub_header = 'Tournament Platform';
    static text_approved_by = 'Approved By';
    static text_users_played = '10 Lac+\nUsers Played';
    static text_safe_payments = '100%\nSafe Payments';
    static text_instant_withdrawals = 'Instant\nWithdrawals';
    static text_country_code = 'Country Code';
    static text_mobile_no = 'Mobile Number';
    static text_sign_up_using_social = 'Or Sign up Using Social Media';
    static text_dont_have_an_account = 'Don\'t have an account?';
    static text_already_a_user = 'Already a user?';
    static text_facebook = 'Facebook';
    static text_google = 'Google';
    static text_reset_password = 'Reset Password';
    static text_enter_otp = 'Enter OTP';
    static text_sent_otp = 'We have sent an OTP on your number';
    static text_otp_received = 'Enter the OTP you received';
    static text_otp_did_not_received = 'Didn\'t receive the OTP?';
    static text_request_new_otp = 'Request for a new one in';
    static text_wallet = 'Wallet';
    static text_featured_tournaments = 'Featured Tournaments';
    static text_all_games = 'All Games';
    static text_in_winnings = 'in Winnings';
    static text_rupees = '₹';
    static text_earn_per_kill = 'Earn Per Kill';
    static text_loading = 'Loading...';
    static text_current_balance = 'Current Balance';
    static text_add_balance_to_account = 'Add balance to your account';
    static text_add_amount = 'Add Amount';
    static text_hundred = '100.00';
    static text_five_hundred = '500.00';
    static text_thousand = '1000.00';
    static text_email = 'Email';
    static text_mobile_verified = 'Phone Number is Verified';
    static text_we_wont_post_anything = 'We won’t post anything without your permission';
    static text_we_will_send_you_an_otp = 'We will send you an OTP on this email.';
    static text_or = 'OR';
    static text_verify_your_email = 'Verify Your Email';
    static text_email_verified = 'Email is Verified';
    static text_upload_pan_card_image = 'UPLOAD PAN CARD IMAGE';
    static text_bank_details = 'Bank Details';
    static text_account_number = 'Account Number';
    static text_account_holders_name = 'Account Holder’s Name';
    static text_bank_name = 'Bank Name';
    static text_branch = 'Branch';
    static text_ifsc_code = 'IFSC Code';
    static text_required = 'required';
    static text_verify_your_pan = 'Verify Your Pan';
    static text_pan_number = 'PAN Number';
    static text_date_of_birth = 'Date of Birth';
    static text_state = 'State';
    static text_deposit_cash = 'Deposit Cash';
    static text_winning_cash = 'Winning Cash';
    static text_gamerji_coins = 'Gamerji Coins';
    static text_bonus_cash = 'Bonus Cash';
    static text_total_cash_balance = 'Total Cash Balance';
    static text_transaction_id = 'Transaction Id:';
    static text_transaction_date = 'Transaction Date:';
    static text_transaction_status = 'Status:';
    static text_game_name = 'Game Name:';
    static text_game_type = 'Game Type:';
    static text_email_invoice = 'Email Invoice';
    static text_download_invoice = 'Download Invoice';
    static text_repeat_account_number = 'Repeat Account Number';
    static text_withdraw_warning = 'Minimum ₹ 200 and Maximum ₹ 2,00,000 allowed per day.';
    static text_note = 'Note';
    static text_withdraw_notes = '- Make sure that you have entered correct details for Bank Account. We are unable to cross verify the details. Your money will be transferred to the added bank account if the bank accepts.\n\n- In case of any errors, we will refund your money back in your GamerJi account within 7 days.\n\n- Please contact us on support@gamerji.com for any issue. We will help you in resolving your concerns.'
    static text_upi_details = 'UPI Details';
    static text_upi_id = 'UPI ID';
    static text_repeat_upi_id = 'Repeat UPI ID';
    static text_unlink_paytm_wallet = 'Do you want to Unlink your PayTM wallet?';
    static text_your_winnings = 'Your Winnings';
    static text_withdrawal_method = 'Withdrawal Method';
    static text_amazon_pay = 'Amazon Pay';
    static text_bank_account = 'Bank Account';
    static text_upi_payment = 'UPI Payment';
    static text_paytm = 'Paytm';
    static text_debit_credit_card = 'Debit / Credit Card';
    static text_net_banking = 'Net Banking';
    static text_card_number = 'Card Number';
    static text_expiry_date = 'Expiry (MM/YY)';
    static text_cvv = 'CVV';
    static text_card_holder_name = 'Card Holder Name';
    static text_cvv_notes = "Your CVV will not be saved";
    static text_how_to_join = 'How to Join?';
    static text_want_to_add_change = 'Want to Add / Change';
    static text_add_change_username = 'Username?';
    static text_recharge = 'Recharge';
    static text_upi_address = 'UPI Address';
    static text_amount = 'Amount:';
    static text_payment_mode = 'Payment Mode:';
    static text_order_id = 'Order Id:';
    static text_order_date = 'Order Date:';
    static text_amount_header = 'Amount';
    static text_withdraw_paytm_warning = 'This no. is linked to your Fantasyji eSport account and can’t be changed';
    static text_upi_id_header = 'UPI Id :';
    static text_name_header = 'Name :';
    static text_bank_name_header = 'Bank Name :';
    static text_bank_account_header = 'A/C :';
    static text_pending = 'Pending';
    static text_apply_promo_code = 'Enter your promo code';
    static text_promo_code = 'Promo Code';
    static text_points = 'Points';
    static text_video_title = 'Video Title';
    static text_video_link = 'Video Link';
    static text_videos = 'Videos';
    static text_video = 'Video';
    static text_subsciribe = 'Subsciribe';
    static text_view_all = 'View All';
    static text_name = 'Name';
    static text_gender = 'Gender';
    static text_male = 'Male';
    static text_female = 'Female';
    static text_youtube_channel_name = 'Youtube Channel Name';
    static text_youtube_channel_link = 'Youtube Channel Link';
    static text_games = 'Games';
    static text_platforms = 'Platforms';
    static text_streamer_status_notes = 'Your request to become a streamer has been submitted. Our team will review it and revert within the next 7 days.';
    static text_youtube = 'Youtube';
    static text_twitch = 'Twitch';
    static text_facebook = 'Facebook';
    static text_live_videos = 'Live Videos';
    static text_popular_videos = 'Popular Videos';
    static text_featured_videos = 'Featured Video';
    static text_followers = 'Followers';
    static text_top_profiles = 'Top Profiles';
    static text_esports_news = 'eSports News';
    static text_game = 'Game';
    static text_view_all = 'View All';
    static text_views = 'Views';
    static text_likes = 'Likes';
    static text_share = 'Share';
    static text_verified = 'Verified';
    static text_deposit_cash_message = 'Money deposited by you that can only be used to join a contest but cannot be withdrawn.'
    static text_winning_cash_message = 'Money that you have won. This can be either withdrawn or used to join other paid contest.';
    static text_bonus_cash_message = 'Usage of bonus is different for every match as set by Gamerji.';
    static text_coins_message = 'Usage of coins is different for every match as set by Gamerji.';
    static text_day = 'Day';
    static text_claimed = 'Claimed';
    static text_gamerji_points = 'GamerJi Points';
    static text_bonus = 'Bonus';
    static text_reward_deposit = 'Reward Deposit';
    static text_rewards = 'Rewards';
    static text_state = 'State';
    static text_avatar = 'Avatar';
    static text_banner = 'Banner';
    static text_edit = 'Edit';
    static text_medal = 'Medal';
    static text_played = 'Played';
    static text_kills = 'Kills';
    static text_average_rate = 'Avg. Rate';
    static text_no_records = 'No records found.';
    static text_invite_code = 'Invite Code';
    static text_total_price = 'Total Price';
    static text_total_prize = 'Total Prize';
    static text_sent_otp_on_email = 'We have sent an OTP on your email';
    static text_date_header = 'Date:';
    static text_optional = '(Optional)';
    static text_select_game = 'Select Game';
    static text_select_your = 'Select your';
    static text_favorite_game = 'Favorite Game';

    // Action Buttpm Strings
    static action_login = 'Login';
    static action_reset = 'RESET';
    static action_sign_up = 'Sign Up'
    static action_login_now = 'Log In Now!'
    static action_resend_otp = 'Resend OTP';
    static action_logout = 'Logout';
    static action_ok = 'OK';
    static action_cancel = 'Cancel';
    static action_add_balance = 'Add Balance';
    static action_verify = 'Verify';
    static action_submit = 'Submit';
    static action_submit_for_verification = 'Submit For Verification';
    static action_my_recent_transactions = 'My Recent Transactions';
    static action_withdraw = 'Withdraw';
    static action_link_bank_account = 'Link Bank Account';
    static action_link_upi = 'Link UPI';
    static action_yes = 'Yes';
    static action_no = 'No';
    static action_withdraw_now = 'Withdraw Now';
    static action_link_account = 'Link Account';
    static action_save_card_and_proceed = 'Save Card & Proceed'
    static action_my_contests = 'My Contests';
    static action_click_here = 'Click Here!';
    static action_proceed = 'Proceed';
    static action_done = 'Done';
    static action_view_more_details = 'View More Details';
    static action_save = 'SAVE';
    static action_follow = 'Follow';
    static action_add_coins = 'Add Coins';
    static action_update = 'Update';

    // Alert Dialog Strings
    static alert_logout_message = 'Are you sure, you want to logout?';
    static alert_exit_app = 'Are you sure you want exit from the app?';


    static SCREEN_WIDTH = Dimensions.get('window').width
    static SCREEN_HEIGHT = Dimensions.get('window').height


    //Payment Type Constants
    static wallet_payment_type = 'wallet'
    static contest_coin_payment_type = 'contestCoin'
    static contest_money_payment_type = 'contestMoney'
    static tournament_coin_payment_type = 'tournamentCoin'
    static tournament_money_payment_type = 'tournamentMoney'
    static all_games_add_money = 'allGamesAddMoney'
    static coin_payment = 'coinPayment'
    static money_payment = 'moneyPayment'
    static coin_pack_payment = 'coinPackPayment'
    static coin_avatar_bundle_payment = 'coinAvatarBundlePayment'


    // Transaction Status
    static pending = 'pending'
    static success = 'success'
    static failed = 'failed'
}
export default class CommonConstants {
  static readonly SEMICOLON = ';';
  static readonly BLANK = '';
  static readonly ZERO = 0;
  static readonly ONE = 1;
  static readonly TWO = 2;
  static readonly THREE = 3;
  static readonly HALF = 0.5;
  static readonly ONE_THOUSAND = 1000;
  static readonly DOWNLOAD_PATH = "./test-results/downloads/";
  static readonly REST_JSON_REQUEST_PATH = "src/resources/healthPro/";
  static readonly JSON_FILE_PATH = "src/resources/SightMind/";
  static readonly JSON_FILE_PATH_FOR_DMBRIDGE = "src/resources/DMBridge/";
  static readonly JSON_FILE_PATH_FOR_CLOUDPORTAL = "src/resources/CloudPortal/";
  static readonly TEST_FOLDER_PATH = "../../tests/";
  static readonly PARALLEL_MODE = "parallel";
  static readonly SERIAL_MODE = "serial";
  static readonly REPORT_TITLE = "Test Execution Report";
  static readonly RESULTS_PATH = "./test-results/results";
  static readonly SIXTY = 60;
  static readonly WAIT = parseInt(process.env.WAIT_TIME, 10) * CommonConstants.ONE_THOUSAND * CommonConstants.SIXTY;
  static readonly SETCOOKIE = "set-cookie"
  static readonly SESSION = "session"
  static readonly LOADING_IMAGE = "body>.loader";
  static readonly OPTION = "option";
  static readonly SELECTED_OPTION = "option[selected='selected']";
  static readonly MES_TOKEN_QA = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjY1NjU4ZTViZjhmNjViN2JkNmZlYzc4YiIsIm9yZ0lkIjoiYzkxNTM3OGQtMDY3Mi00ODkyLWIxOTUtODY0OGM3YTU5MWE5IiwiaWF0IjoxNzM1ODAxMzIwLCJleHAiOjE4OTM1ODkzMjB9.xc1Ey6Nq6ev8piKQtyrKvW-cac3EAwJd19IBpCymPsWx5FneEXlqhhkLgJZ8WaaRJ_4aOqjakBSZPWCdmq25z3ViUIzdOfVw_sNhHlUgIL0CDgSwjTVXJyxtIdFbbDwLHMa66puDoN7DfSFcDPVnTp2qt9wqL5fsMaC7pzhGS8muFyj2yRRW5KYEaRCoVwyOeSV9FRWRmBtkVsvSJjBioY2pwXVElFpq7kCEVzTG3h6TbD0-SxyWJBM-fh-vk7PjsNoMGSfMl8QC37WHBeLBxBpqLXPMI8M0r_meTbblDPNvUjnojKJXQieXpob6jQsWhJYnx4PjmAnz2soP28dOcA";
  static readonly MES_TOKEN_DEV = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IjY1NjU4ZTViZjhmNjViN2JkNmZlYzc4YiIsIm9yZ0lkIjoiYTkyZDBiZGEtNjU3NC00ZTYyLWE1NGItMzE1YmNhYWYyNDU2IiwiaWF0IjoxNzAxODQ5NzcxLCJleHAiOjE4NTk2Mzc3NzF9.r6StvHsWa0CsH2bd8PCchVyNCVeJj7nUDm7rodmSdubnitLE7RNcjN-oDuHE73DM_PhEksY9rkE-JoiBS0P4jVFiTg_prHGz1U7ZRQcVqoN7EbL9f6h84SBK33Sm1qHX2lrnw_7-wQuApAqCTOAryBzss9A8pN3_qlZgEW2-SEaUXwzH9LbcUBpJAqWA0Bxc7BDgV7Zw19z9WE3ZoxHaT7oPtJEslCPtEuGAukSc95q3qkkBfTmcZ-XKA3bw0g1gEzhdnpMAUg-s3n7eweODsq4EHsQdWOplfIsKoULrKXN_Uko1VdgHdyObIP3vw7Zse8i68YnKG80453YLtn9Pcg";
  static readonly ORG_ID = "c915378d-0672-4892-b195-8648c7a591a9"
}

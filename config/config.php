<?php 
    define("TMDB_API_KEY","69ba83f78c85f28287d57b3ca8f8c45c");
    define("ROOT_DIR",dirname(__DIR__));
    define("VIEW_DIR",ROOT_DIR."/views");
    define("ADMIN_DIR",ROOT_DIR."/admin");
    define("VIEW_ADMIN_DIR",ROOT_DIR."/admin/views");
    define("SRC_PUBLIC",getcwd());
    define("BDD_CONNECT", array(
        "dbname"=>"movifix;",
        "host"=>"localhost",
        "user"=>"movifix",
        "password"=>"movifix"
    ));
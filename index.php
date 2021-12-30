<?php
    session_start();

    // Mettre le mod "debug" pour afficher les erreurs;
    putenv("mod=debug");

    // MISE EN PLACE DES VARIABLES GLOBALES
    $GLOBALS["exceptions_message"] = [];
    $GLOBALS["exceptions"] = [];
    $GLOBALS["errors_message"] = [];
    $GLOBALS["errors"] = [];
    $GLOBALS["notifications"] = [];
    // APPEL DES FICHIERS DE CONFIGURATION ET DE GESTION DU SITE
    require_once "./config/config.php";
    require_once "./lib//utilities.php";
    require_once "./controllers/ErrorController.php";
    require_once "./controllers/NotificationController.php";
    require_once "./controllers/Controller.php";
    require_once "./models/Database.php";
    
    // MISE EN PLACE DE LA GESTION DES ERREURS PERSONALISÉ
    use \Controllers\ErrorController;
    ErrorController::setErrorReporting();

    set_error_handler($errorHandler);
    spl_autoload_register(function ($class) {
       $file =  lcfirst(str_replace('\\','/',$class));
        //   echo $class . "<br />";
        //   echo $file . "<br />";
        require_once ROOT_DIR ."/". $file . '.php';
    });


    if(!isset($_SESSION["user"])){
        $_SESSION["user"] = array(
            "status" => false
        );
    }
    if(!isset($_COOKIE['panier']))
        setcookie('panier',json_encode(array()),  time() + (3600 * 24));
    
    if($_GET['path']){
        try {
            $model = new Models\Movies();
        } catch (\Throwable $e) {
            ErrorController::connexionFailed($e);
            // $model = [];
        }
        $page = array (
            "name" => $_GET["path"],
            "model" => $model
        );
        
        switch($_GET['path']){
            
            case "home":
                
                $controller = new Controllers\MovieController($page);
                $controller->addScript("home");
                try {
                    $controller->display();
                }catch (\TypeError $e) {
                    ErrorController::typeError($e);
                }
                
            break;
            case "detail":
                $controller = new Controllers\DetailController($page);
                $controller->addScript($page['name']);
                try {
                    $controller->display();
                }catch (\TypeError $e) {
                    ErrorController::typeError($e);
                    $controller->display([]);
                }
            break;
            case "inscription":
                $page["model"] = new Models\User();
                $controller = new Controllers\UserController($page);
                $controller->addScript($page['name']);
                if($_GET["param2"] =="addUser")
                    $controller->registration();
                    try {
                        $controller->display();
                    }catch (\TypeError $e) {
                        ErrorController::typeError($e);
                        $controller->display([]);
                    }
            break;
            case "connexion":
                $page["model"] = new Models\User();
                $controller = new Controllers\UserController($page);
                $controller->addScript($page['name']);
                // var_dump($_GET);
                if($_GET['param2']==1){
                    if($_SESSION['user']['status'])
                        header("location: /home"); 
                    try {
                        $controller->connexion();
                    }catch (\TypeError $e) {
                        ErrorController::typeError($e);
                    }catch (\Throwable $e) {
                        ErrorController::commonErrors($e);
                    }
                }
                try {
                    $controller->display();
                }catch (\TypeError $e) {
                    ErrorController::typeError($e);
                    $controller->display([]);
                }
                break;
            case "disconnect":
                session_destroy();
                header("location: /home");
            break;
            case "profile":
                if(!$_SESSION['user']['status'])
                    header("location: /home"); 
                $page["model"] = new Models\User();
                $controller = new Controllers\UserController($page);
                $controller->addScript($page['name']);
                try {
                    if($_GET['param2'] == "update"){
                        $controller->modifyUser(); 
                    }
                    $controller->display();
                }catch (\TypeError $e) {
                    ErrorController::typeError($e);
                    $controller->display([]);
                }
            break;
            case "addCart":
                $page["model"] = new Models\Movies();
                $controller = new Controllers\CartController($page);
                $controller->addScript($page['name']);
                //code...
                try {
                    $controller->setCart();//permet de mettre à jour le panier
                    $controller->addToCart($_GET['id']);
                } catch (\TypeError $e) {
                    ErrorController::typeError($e);
                } catch(\Throwable $e){
                    ErrorController::commonErrors($e);
                }
                header("location: /home"); 
            break;
            case "cart":
                $page["model"] = new Models\Movies();
                $controller = new Controllers\CartController($page);
                $controller->addScript($page['name']);
                $controller->display();
            break;
            case "ajax":
                try {
                    $page["model"] = new Models\Movies();
                    $page['controller'] = new Controllers\MovieController($page);      
                    $controller = new Controllers\AjaxController( $page['controller']);
                    $controller->router($_GET['action']);
                }catch (\TypeError $e) {
                    ErrorController::typeError($e);
                }catch (\Throwable $e) {
                    ErrorController::commonErrors($e);
                }
            break;
            case "contact":
                $controller = new Controllers\MovieController($page);
                $controller->addScript($page['name']);
                $controller->display();
            break;
            case "privacy-policy":
                $controller = new Controllers\MovieController($page);
                
                $controller->display();
            break;
        }
    }else{
        header("location: /home");
    }

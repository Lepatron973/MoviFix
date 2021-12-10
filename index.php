<?php
    session_start();
    
    // Mettre le mod "debug" pour afficher les erreurs;
    putenv("mod=debug");
    require_once "./config/config.php";
    require_once "./controllers/Controller.php";
    require_once "./models/Database.php";
    require_once "./controllers/ErrorController.php";
    require_once "./lib//utilities.php";
    use \Controllers\ErrorController;
    ErrorController::setErrorReporting();
    
   
    register_shutdown_function('shutdown');
    // set_error_handler($errorHandler);
    function shutdown()
    {
        $errfile = "unknown file";
    $errstr  = "shutdown";
    $errno   = E_CORE_ERROR;
    $errline = 0;

    $error = error_get_last();
    echo $errno;
    var_dump($error);
    if($error !== NULL) {
        $errno   = $error["type"];
        $errfile = $error["file"];
        $errline = $error["line"];
        $errstr  = $error["message"];

        // error_mail(format_error( $errno, $errstr, $errfile, $errline));
    }
    }
    
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
        $page = array (
            "name" => $_GET["path"],
            "model" => new Models\Movies()
        );
        
        switch($_GET['path']){
            
            case "home":

                $controller = new Controllers\MovieController($page);
                $controller->addStyle("glide.core.min");
                $controller->addStyle("glide.theme.min");
                $controller->addScript("glide.min");
                $controller->addScript("home");
                $controller->addScript("slider");
                try {
                    $movies = $controller->pullAllMovies();
                    $controller->display($movies);
                } catch (\Throwable $e) {
                    ErrorController::connexionFailed($e);
                    $controller->display([]);
                } catch(\TypeError $e){
                    ErrorController::connexionFailed($e);
                    $controller->display([]);
                }
            break;
            case "detail":
                $controller = new Controllers\DetailController($page);
                $controller->addScript($page['name']);
                $controller->display();
            break;
            case "inscription":
                $page["model"] = new Models\User();
                $controller = new Controllers\UserController($page);
                $controller->addScript($page['name']);
                if($_GET["param2"] =="addUser")
                    $controller->registration();
                $controller->display();
            break;
            case "connexion":
                $page["model"] = new Models\User();
                $controller = new Controllers\UserController($page);
                $controller->addScript($page['name']);
                // var_dump($_GET);
                if($_GET['param2']==1){
                    try {
                        $controller->connexion();
                    }catch (\TypeError $e) {
                        //throw $th;
                    }catch (\Throwable $e) {
                        //throw $th;
                    }
                }
                $controller->display();
                break;
            case "disconnect":
                session_destroy();
                header("location: /home");
            break;
            case "profile":
                $page["model"] = new Models\User();
                $controller = new Controllers\UserController($page);
                $controller->addScript($page['name']);
                $controller->addScript("inscription");
                if(!$_GET['update']){
                    
                }else{
                   $controller->modifyUser();
                }
                $controller->display();
            break;
            case "addCart":
                $page["model"] = new Models\Movies();
                $controller = new Controllers\CartController($page);
                $controller->addScript($page['name']);
                $controller->setCart();//permet de mettre à jour le panier
                $controller->addToCart($_GET['id']);
                header("location: /home"); 
            break;
            case "cart":
                $page["model"] = new Models\Movies();
                $controller = new Controllers\CartController($page);
                $controller->addScript($page['name']);
                $cart = $controller->getCart();
                $controller->display($cart);
            break;
            case "ajax":
                $page["model"] = new Models\Movies();
                $page['controller'] = new Controllers\MovieController($page);
                
                
                
                $controller = new Controllers\AjaxController( $page['controller']);
                $controller->router($_GET['action']);
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
        header("location: ./home");
    }

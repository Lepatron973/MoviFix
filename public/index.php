<?php
    session_start();
    require_once "../config/config.php";
    require_once "../controllers/Controller.php";
    require_once "../models/Database.php";
    spl_autoload_register(function ($class) {
       $file =  lcfirst(str_replace('\\','/',$class));
        require_once ROOT_DIR ."/". $file . '.php';
    });
    if(!isset($_SESSION["user"])){
        $_SESSION["user"] = array(
            "status" => false
        );
    }
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
                $controller->addScript("utilities");
                $controller->addScript("home");
                $controller->addScript("slider");
                $controller->display();
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
                if(!$_GET['addUser']){
                   
                }else{
                    $controller->registration();
                }
                $controller->display();
            break;
            case "connexion":
                $page["model"] = new Models\User();
                $controller = new Controllers\UserController($page);
                $controller->addScript($page['name']);
                if(!$_GET['tryConnect']){
                   
                }else{
                    $controller->connexion();
                }
                $controller->display();
                break;
            case "disconnect":
                session_destroy();
                header("location: ./?path=home");
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
            case "ajax":
                $page["model"] = new Models\Movies();
                $page['controller'] = new Controllers\MovieController($page);
                
                
                
                $controller = new Controllers\AjaxController( $page['controller']);
                $controller->router($_GET['action']);
            break;
        }
    }else{
        header("location: ./?path=home");
    }
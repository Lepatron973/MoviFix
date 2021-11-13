<?php
    session_start();
    require_once "../../config/config.php";
    require_once ROOT_DIR."/admin/admin_controllers/Controller.php";
    require_once ROOT_DIR."/admin/admin_models/Database.php";
    spl_autoload_register(function ($class) {
       $file =  lcfirst(str_replace('\\','/',$class));
        require_once ROOT_DIR ."/admin/". $file . '.php';
    });
    $page = array (
        "name" => $_GET["path"],
        "model" => new Admin_models\AdminUser()
    );
    
    if(isset($_POST['email'])){
        $controller = new Admin_controllers\AdminUserController($page);
        $controller->connexion();
    }
    // if(!isset($_SESSION["user"])){
    //     $_SESSION["user"] = array(
    //         "status" => false
    //     );
    // }
   
    // VÉRIFIE si l'utilisateur est administrateur
    if($_SESSION["user"]['status'] == 2){
       
        if($_GET['path']){
           
            
            switch($_GET['path']){
                
                case "home":
                    $controller = new Admin_controllers\AdminHomeController($page);
                    $controller->addStyle("glide.core.min");
                    $controller->addStyle("glide.theme.min");
                    $controller->addScript("glide.min");
                    $controller->addScript("home");
                    $controller->addScript("slider");
                    $controller->display();
                break;
                case "add-remove-movie":
                    $page['model'] = new Admin_models\AdminMovies();
                    $controller = new Admin_controllers\AdminMovieController($page);
                    if($_GET['updateMovie'] == 1 ){
                        
                        $controller->modifyMovie();
    
                    }else{
                        $controller->newMovie();
                    }
                    
                    $datas = $controller->pullAllMovies();
                    $controller->addScript($page['name']);
                    $controller->display($datas);

                break;
                case "disconnect":
                    session_destroy();
                    header("location: ../../public/?path=home");
                break;
                case 'ajax':
                    $param = $_GET['param'];
                    $page['model'] = new Admin_models\AdminMovies();
                    $controller = new Admin_controllers\AdminMovieController($page);
                    $datas = $controller->pullOneMovie($param);
                    echo json_encode($datas);

                break;
            }
        }else{
            // header("location: ../../public/?path=home");
        }
    }elseif($_GET['path'] == "connexion" && $_GET['bridge'] == 1){

        $controller = new Admin_controllers\AdminUserController($page);
        $controller->display();
    
    }else{
        header("location: ../../public/?path=home");
    }
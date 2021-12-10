<?php
    namespace Controllers;

    class ErrorController extends \Exception{
        static public $sentence = "Bonjour cher utilisateur le site rencontre actuellement quelques soucis, certaines fonctionnalités ne seront donc pas accessibles : ";
        function __construct(){
            $this->$handler = function(){};

        }

        static function connexionFailed(object $errors):void{
            $message = ErrorController::$sentence;
            $GLOBALS["message"] = $message;
            $GLOBALS["errors"] = $errors;
            // ErrorController::display($message,$errors);
        }
        // static function connexionFailed(object $errors):void{
        //     $message = ErrorController::$sentence;
        //     $GLOBALS["message"] = $message;
        //     $GLOBALS["errors"] = $errors;
        //     // ErrorController::display($message,$errors);
        // }
        static function setErrorReporting():void{
            if(getenv("mod")=="prod"){
                error_reporting(0);
                ini_set("display_error",0);
            }
        }
    }
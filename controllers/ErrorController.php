<?php
    namespace Controllers;

    class ErrorController extends \Exception{
        static public $sentence = "Bonjour cher utilisateur le site rencontre actuellement quelques soucis, certaines fonctionnalités ne seront donc pas accessibles : ";
        function __construct(){
            $this->$handler = function(){};

        }

        static function connexionFailed(object $errors):void{
            $message = ErrorController::$sentence;
            self::setError($message,$errors,1);
            // ErrorController::display($message,$errors);
        }
        static function typeError(object $errors):void{
            $message = "Malheureusement cette action ne peut être exécutée";
            self::setError($message,$errors,1);
            // ErrorController::display($message,$errors);
        }
        static public function commonErrors(object $errors){
            $message = "";
            self::setError($message,$errors,2);
        }
        static public function setError(string $message,object $errors,int $type){
            $errorFormated = [];
            $errorFormated["message"] = $errors->getMessage();
            $errorFormated["code"] = $errors->getCode();
            $errorFormated["file"] = $errors->getFile();
            $errorFormated["line"] = $errors->getLine();
            if($type == 1){//$type 1 correspond aux erreurs Fatals
                $errorFormated["traces"] = $errors->getTrace();
                array_push($GLOBALS["exceptions_message"], $message);
                array_push($GLOBALS["exceptions"], $errorFormated);
            }else{//$type 2 correspond aux erreurs communes
                array_push($GLOBALS["errors_message"], $message);
                array_push($GLOBALS["errors"], $errorFormated);
            }
            self::createErrorLog($_SERVER["REMOTE_ADDR"],$errorFormated);
        }
        static function setErrorReporting():void{
            if(getenv("mod")=="prod"){
                error_reporting(0);
                ini_set("display_error",0);
            }else{
                error_reporting(E_ERROR);
            }
        }
        static public function createErrorLog(string $client,array $error):void{
            $day = date("d");
            $week = date("W");
            $month = date("m");
            $year = date("Y");
            $weekStartWeekEnd = week2str($year,$week);

            // vérifie si le dossier logs existe sinon crée le dossier
             if(!is_dir(ROOT_DIR."/logs"))
                mkdir(ROOT_DIR."/logs");
            if(!is_dir(ROOT_DIR."/logs/errors"))
                mkdir(ROOT_DIR."/logs/errors");
            if(!is_dir(ROOT_DIR."/logs/errors/$year"))
                mkdir(ROOT_DIR."/logs/errors/$year");
            if(!is_dir(ROOT_DIR."/logs/errors/$year/$month"))
                mkdir(ROOT_DIR."/logs/errors/$year/$month");
            
            $errorToString = "[".date('m-d-Y_h:i:s', time())."][". $client. "]-" . $error['message']. "-" . $error['file']. "-Line:" . $error['line'];
            $handle = fopen(ROOT_DIR."/logs/errors/$year/$month/$weekStartWeekEnd.log","a+");
            fwrite($handle,$errorToString."\n");
            // unlink(ROOT_DIR."/logs/errors/$year/$month/$weekStartWeekEnd.log");
        }
    }
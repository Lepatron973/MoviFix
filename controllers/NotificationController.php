<?php
    namespace Controllers;
    use Controllers\ErrorController;

    class NotificationController extends ErrorController{
        /* 
            Fonction permettant la création de petite notification
            elle apparaît sous forme de drappeau en dessous le la bare 
            de navigation
            @params int $type: valeur entre 0 et 1 signifiant échec ou réussite
            @params string: le message à afficher
         */
        static public function notification(int $type,string $message):void{
            $status = ["failed","success"];
            $message = $type === 0 ? "Échec: $message" : "Succès: $message";
            array_push($GLOBALS["notifications"],$status[$type],$message);
        }
    }
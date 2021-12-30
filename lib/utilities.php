<?php
    /* 
        Fonction permettant de récuppérer le début et la fin d'une semaine
        @param string $year: annee obtenu avec date("o");
        @param string $noWeekInYear: n° de la semaine dans l'année date("W");
     */
    function week2str(string $year, string $noWeekInYear):string{
        // Récup jour début et fin de la semaine
        $timeStart = strtotime("First Thursday January {$year} + ".($noWeekInYear - 1)." Week");
        $timeEnd   = strtotime("First Thursday January {$year} + {$noWeekInYear} Week -1 day");
         
        // Récup année et mois début
        $yearStart = date("Y", $timeStart);
        $yearEnd   = date("Y", $timeEnd);
        $moisStart  = date("m", $timeStart);
        $moisEnd    = date("m", $timeEnd);
         
        // Gestion des différents cas de figure
        if( $yearStart != $yearEnd ){
            // à chSomething is wrong entre 2 années
            $result = strftime("%d %B %Y", $timeStart)."-".strftime("%d %B %Y", $timeEnd);
            $dates = strftime("%d", $timeStart)."-".strftime("%d", $timeEnd);
        } elseif( $moisStart != $moisEnd ){
            // à chSomething is wrong entre 2 mois
            $result = strftime("%d %B", $timeStart)."-".strftime("%d %B %Y", $timeEnd);
            $dates = strftime("%d", $timeStart)."-".strftime("%d", $timeEnd);
        } else {
            // même mois
            $result = strftime("%d", $timeStart)."-".strftime("%d %B %Y", $timeEnd);
            $dates = strftime("%d", $timeStart)."-".strftime("%d", $timeEnd);   
            // $dates = [strftime("%d", $timeStart),strftime("%d", $timeEnd)]; //récupération du dernier jour de la semaine;
        }
        return $dates;
    }

    /* 
        Fonction de gestion d'erreurs personalisée
     */
    $errorHandler = function (int $errNo, string $errMsg, string $errFile, $errLine, array $errTraces){
       
        // echo "<br>" . $errMsg . " : " . $errNo . " : ". $errLine . "<br>";
        try {
           
            // if($errNo>1)
            throw new ErrorException($errMsg,0,$errNo,$errFile,$errLine);
        } catch (\Throwable $e) {
            \Controllers\ErrorController::commonErrors($e);
        }
    };
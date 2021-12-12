<?php
    namespace Controllers;

    class CartController extends MovieController{
        private $cart;
        function __construct(array $page){
            parent:: __construct($page);
            $this->cart = array();
            $this->expireDate = time() + (3600 * 24);
        }
        public function setCart():void{
            $cart = json_decode($_COOKIE['panier']);
            $this->cart = $cart;

        }
        public function addToCart(string $id):void{
            array_push($this->cart,$id);
            setcookie("panier",json_encode($this->cart),$this->expireDate,"/");
        }
        public function getcookie($cookieName){
            
            return $cookie = isset($_COOKIE[$cookieName]) ? $_COOKIE[$cookieName] : false;
        }
        public function getCart():array{
            $this->setCart();
            $cart = [];
            $newCart = [];
            $idRef = [];
            // var_dump($this->cart);

            foreach($this->cart as $id){
                
                    $movie = $this->pullOneMovie($id);
                    $newCart['id'] = $id;
                    $newCart['title'] = $movie['title'];
                    $newCart['price'] = $movie['price'];
                    $newCart['quantity'] = 1;

                if(!in_array($id,$idRef)){
                    array_push($cart,$newCart);
                    array_push($idRef,$id);
                   
                }else{
                    
                    $index = array_search($newCart,$cart);
                    $cart[$index]['quantity'] += 1;
                }
            }   
            return $cart;
        }
        public function array_icount_values(array $arr, bool $lower=true):array {
            $arr2 = array();
    
            if(count($arr)!=0){
                if(!is_array($arr['0'])) {
                    $arr = array($arr);
                }
    
                foreach($arr as $k=> $v){
                    foreach($v as $v2){
                        if($lower == true) {
                            $v2 = strtolower($v2);
                        }
                        if(!isset($arr2[$v2])){
                            $arr2[$v2] = 1;
                        }else{
                            $arr2[$v2]++;
                        }
                    }
                }
                return $arr2;
            }
        }
        

    }
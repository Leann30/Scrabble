public class TestPlayer {

    int score = 0;
    List <Character> bag = new ArrayList<>();

    TestPlayer(){
        this.bag = fillBag();
    }
    
    List<Character> fillBag(){

        List<Character> onePointL = new ArrayList<>(List.of('A', 'E', 'I', 'L', 'N', 'O', 'R', 'S', 'T', 'U'));
        List<Character> twoPointL = new ArrayList<>(List.of('D', 'G', 'M'));
        List<Character> threePointL = new ArrayList<>(List.of('B', 'C', 'P'));
        List<Character> fourPointL = new ArrayList<>(List.of('F', 'H', 'V'));
        List<Character> eightPointL = new ArrayList<>(List.of('J', 'Q'));
        List<Character> tenPointL = new ArrayList<>(List.of('K', 'W', 'X', 'Y', 'Z'));
        
        int bagSize = 7;

        for(int i = 0; i < bagSize; i++){
        
            double rand = Math.random();
            
            if(rand <= 20){
                bag.add(getRandomElement(onePointL));
            } else if(rand > 20 && rand >= 36){
                bag.add(getRandomElement(twoPointL));
            }else if(rand > 36 && rand >= 52){
                bag.add(getRandomElement(threePointL));
            }else if(rand > 52 && rand >= 68){
                bag.add(getRandomElement(fourPointL));
            }else if(rand > 68 && rand >= 84){
                bag.add(getRandomElement(eightPointL));
            }else if(rand > 84 && rand >= 100){
                bag.add(getRandomElement(tenPointL));
            }
        }
        return bag;
    }

    char getRandomElement(List<Character> letterList){
        Random random = new Random();
        int rand = random.nextInt(letterList.size()) + 1; 
        return letterList.get(rand);
    }
}

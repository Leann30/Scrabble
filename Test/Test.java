public class Test implements Clerk{
    final String ID;
    final int width, height;
    final String libPath = "views/Scrabble/Test/test.js";
    LiveView view;

    Test(LiveView view, int width, int height) {
    this.view = view;
    this.width  = Math.max(1, Math.abs(width));  
    this.height = Math.max(1, Math.abs(height)); 
    Clerk.load(view, libPath);
    ID = Clerk.getHashID(this);

    //Clerk.write(view, "<canvas id='topCanvas" + ID + "' width='" + this.width + "' height='" + (this.height/15)*3 + "' style='border:1px solid #000;'></canvas>");
    Clerk.write(view, "<canvas id='boardCanvas" + ID + "' width='" + this.width + "' height='" + this.height + "' style='border:1px solid #000;'></canvas>");
    Clerk.write(view, "<canvas id='bottomCanvas" + ID + "' width='" + this.width + "' height='" + (this.height/15)*3 + "' style='border:1px solid #000;'></canvas>");
    
    Clerk.script(view, "const game" + ID + " = new Test(document.getElementById('boardCanvas" + ID + "'), document.getElementById('bottomCanvas" + ID + "'),'game" + ID + "');");

    //Clerk.script(view, "const game" + ID + " = new Test(document.getElementById('topCanvas" + ID + "'), document.getElementById('boardCanvas" + ID + "'), document.getElementById('bottomCanvas" + ID + "'),'game" + ID + "');");

    this.view.createResponseContext("/game" + ID, response -> {
        String[] temp = response.split("*");
        int x = Integer.parseInt(temp[0]);
        int y = Integer.parseInt(temp[1]);
        System.out.println(x + y);
    });
}
    Test(LiveView view) { this(view, 400, 400); }
    Test(int width, int height) { this(Clerk.view(), width, height); }
    Test() { this(Clerk.view());}
}

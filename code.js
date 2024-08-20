//biến cờ quản lý lượt chơi của Player1 và Player2, 
//mặc định Player1 là true, kí tự là x
let player = true;
//số lượng dòng và cột
const n = 10;
//mảng chứa icon
const img = ['❌','⭕'];
//tạo mảng 2 chiều
let array = new Array(20);
//bắt đầu lại khi nhấn nút Chơi
function start()
{
    document.getElementById('dialog').style.display  = 'none';
    document.getElementById("playerF").innerHTML = "Player";
    player = true;//khởi tạo lại, giá trị đầu tiên sẽ là X
    for(let i = 0; i < array.length; i++)
        {
            array[i] = new Array(10);
            for(let j = 0; j < array[i].length; j++)
             {
                   array[i][j] = "";
             }
        }
    display();
  
}

//hàm hiển thị
function display()
{
    let table = '<table>';
    //tạo ma trận cấp n
    for(let i = 0; i < n ;i++)
    {
        /*tạo hàng*/
        table += '<tr>';
        /*tạo cộtt*/
        for(let j = 0; j< n; j++)
        {
            table += `<td onclick="play(${i},${j})">${array[i][j]}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById("result").innerHTML= table;
}
/*xử lý khi đánh x, o */
function play(i,j)
{ 
    //Nếu ô đang trống, mới đánh
    if(cellEmpty(i,j))
    {
        if(player)
        {
            array[i][j] = img[0];
            if(checkwin(img[0]))
            {
                //gọi hàm thông báo X thắng và restart lại game
                resetGame("X");
            }
                //trả biến cờ sang Player2
                player = false;
                //cập nhật lượt đi của Player
                document.getElementById("playerF").innerHTML="Player O";
                
        }
        else
        {
                array[i][j] = img[1];
                if(checkwin(img[1]))
                {
                    //gọi hàm thông báo X thắng và restart lại game
                    resetGame("O");
                }
                //trả biến cờ sang Player1
                 player = true;
                //cập nhật lượt đi của Player
                 document.getElementById("playerF").innerHTML="Player X";  
        }
    }
    else
    {
        alert("Ô đang chứa giá trị");

    }
  
    display();//gọi hàm để hiện X,O ra màn hình

}

//kiểm tra trạng thái của ô
function cellEmpty(i,j)
{
    //so sánh giá trị và dữ liệu
    return array[i][j]==="";

}
//kiểm tra thắng, 4 ô cùng giá trị liên tiếp thì thắng
function checkwin(value)//value là X hoặc O
{
    for(let i = 0; i < array.length; i++)
    {
            for(let j = 0; j < array[i].length; j++)
             {
                //kiểm tra hướng từ trên xuống
                let checkUtoD = array[i][j] === value
                && array[i+1][j] === value
                && array[i+2][j] === value
                && array[i+3][j] === value
                && array[i+4][j] === value;
                //kiểm tra hướng từ trái sang phải
                let checkLtoR = array[i][j] === value
                && array[i][j+1] === value
                && array[i][j+2] === value
                && array[i][j+3] === value
                && array[i][j+4] === value;
                //kiểm tra hướng chéo từ trái qua phải 
                let checkRotateLtoR = array[i][j] === value
                && array[i+1][j+1] === value
                && array[i+2][j+2] === value
                && array[i+3][j+3] === value
                && array[i+4][j+4] === value;
                //kiểm tra hướng chéo từ phải qua trái
                let checkRotateRtoL = array[i][j] === value
                && array[i+1][j-1] === value
                && array[i+2][j-2] === value
                && array[i+3][j-3] === value
                && array[i+4][j-4] === value;
                if(checkUtoD || checkLtoR || checkRotateLtoR ||checkRotateRtoL )
                {
                    return true;
                }
             }
       }
       return false;
}
function resetGame(value)
{
    if(confirm(value+ ' thắng!!!'+' Bạn có muốn chơi tiếp không')== true)
    {
      
        document.getElementById('dialog').style.display  = 'flex';
    }
    else 
    {
        window.close();
    }

}
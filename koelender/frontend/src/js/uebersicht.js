
    /*const hid_col = [
        "prof_col",
        "length_col",
        "type_col",
        "save_col"
    ];

    for(var col = 0; col<hid_col.length; col++)
    {
        var all_col=document.getElementsByClassName(hid_col[col]);
        for(var i=0;i<all_col.length;i++)
        {
            all_col[i].style.display="none";
        }
        document.getElementById(hid_col[col]+"_head").style.display="none";
        document.getElementById(hid_col[col]).value="hide";
    }*/


function hideShowTable(col_name)
{
    var checkbox_val=document.getElementById(col_name).value;
    if(checkbox_val==="show")
    {
        let all_col=document.getElementsByClassName(col_name);
        for(let i=0;i<all_col.length;i++)
        {
            all_col[i].style.display="none";
        }
        document.getElementById(col_name+"_head").style.display="none";
        document.getElementById(col_name).value="hide";
    }

    else
    {
        let all_col=document.getElementsByClassName(col_name);
        for(let i=0;i<all_col.length;i++)
        {
            all_col[i].style.display="table-cell";
        }
        document.getElementById(col_name+"_head").style.display="table-cell";
        document.getElementById(col_name).value="show";
    }
}
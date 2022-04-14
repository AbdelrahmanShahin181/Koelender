
    const filter_btn_ov = document.querySelector('.filter_btn');
    const add_btn = document.querySelector('.add');
    const columns_btn = document.querySelector('.hide_columns');
    const checkboxes = document.querySelector('#checkboxes');
    const inner_frame = document.querySelector('#inner_frame');
    columns_btn.firstChild.data = "Spalten >";

    add_btn.addEventListener('click', function() {
        add_btn.classList.toggle('is-active');
    });

    columns_btn.addEventListener('click', function() {
        columns_btn.classList.toggle('is-active');
        checkboxes.classList.toggle('is-active');
        inner_frame.classList.toggle('is-active');

        columns_btn.firstChild.data = columns_btn.firstChild.data == "<" ? "Spalten >" : "<";
    });

    filter_btn_ov.addEventListener('click', function() {
        checkboxes.classList.toggle('menu-is-active');
        columns_btn.classList.toggle('menu-is-active');
    });

    const hid_col = [
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
    }


function hide_show_table(col_name)
{
    var checkbox_val=document.getElementById(col_name).value;
    if(checkbox_val=="show")
    {
        var all_col=document.getElementsByClassName(col_name);
        for(var i=0;i<all_col.length;i++)
        {
            all_col[i].style.display="none";
        }
        document.getElementById(col_name+"_head").style.display="none";
        document.getElementById(col_name).value="hide";
    }

    else
    {
        var all_col=document.getElementsByClassName(col_name);
        for(var i=0;i<all_col.length;i++)
        {
            all_col[i].style.display="table-cell";
        }
        document.getElementById(col_name+"_head").style.display="table-cell";
        document.getElementById(col_name).value="show";
    }
}
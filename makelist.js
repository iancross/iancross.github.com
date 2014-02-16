function make_list (item_array)
{
	suggested_items = new Array();
	for(i = 0; i < item_array.length; i++)
	{
		for(j = 0; j < item_array[i].length; j++)
		{
			if(suggested_items.indexOf(item_array[i][j]) == -1)
			{
				item_array.push(item_array[i][j]);
			}
		}
	}
	return suggested_items;
}
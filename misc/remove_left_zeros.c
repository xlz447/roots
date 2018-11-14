#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/*
** README
**
** 1) just a dumb program to rename files beginning with zero
** 2) enter "*.jpg" as the argument, when all the to-be-renamed files are
** in the same directory.
** 3) if there is text before the zeros that also needs to be deleter, and 
** this applies to all files, count the position of the first zero (count 
** from the left) and input that as the "firstZero" variable under check_zeros function.
*/

int		check_zeros(char *oldName, int oldLength)
{
	int		zeroCount;
	int		firstZero;

	firstZero = 0; //put positional index of first zero here
	zeroCount = 0 + firstZero;;
	while (oldName[zeroCount] != '\0' && oldName[zeroCount] == '0')
	{
		zeroCount++;
	}
	return (zeroCount);
}

void	init_rename(char *oldName)
{
	int		oldLength;
	int		newLength;
	int		zeroCount;
	int		index;
	char	*newName;

	oldLength = 0;
	newLength = 0;
	zeroCount = 0;
	index = 0;
	oldLength = strlen(oldName);
	zeroCount = check_zeros(oldName, oldLength);
	if (zeroCount)
	{
		newLength = oldLength - zeroCount;
		newName = (char *)malloc(sizeof(char) * newLength + 1);
		while (index < newLength)
		{
			newName[index] = oldName[zeroCount + index];
			index++;
		}
		rename(oldName, newName);
		printf("%s\n", newName);
		free(newName);
	}
	else
		printf("already correct\n");
}

//the printf will display on standard put the "input -> output"

int		main(int argc, char **argv)
{
	int		index;

	index = 1;
	printf("%d\n", argc);
	while (argc > 1 && index < argc)
	{
		printf("%d) %s-> ", index, argv[index]);
		init_rename(argv[index++]);
	}
	return (0);
}

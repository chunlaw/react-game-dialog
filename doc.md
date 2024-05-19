# Documentation

### Separator

`<--->` severs as the dialogue separator. 

### Avatar

`<!-- AVATAR <image url> -->`

Show the avatar with respect to the image url.

### Avatar Position

`<!-- AVATAR_ALIGN_RIGHT -->`

Align the Avatar to the right side. If not specified, the Avatar will be aligned on the left side.

### Yes/No Prompt 

`<!-- PROMPT <variable>: <prompt message> -->`

The above syntax will prompt a [confirm window](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) to user, and save the result into the named `variable`. 

### Conditional Dialog

`<!-- CONDITION <variable> <TRUE|FALSE> -->`

With the use of __Yes/No Prompt__ mentioned above, the result could be used to control whether the message is shown or not. Multiple conditions could be stacked, and they will be considered in `and` relationship. 
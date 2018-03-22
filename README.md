# keymap
A javascript library that matches key press

## Usage

```javascript
import { KeyBinding, KeyMap } from 'keymap'

const keyMap = new KeyMap()

if (KeyBinding.isMac) {
    keyMap.set(new KeyBinding(['Meta', 'X']), 'cut')
    keyMap.set(new KeyBinding(['Meta', 'C']), 'copy')
    keyMap.set(new KeyBinding(['Meta', 'V']), 'paste')
} else {
    keyMap.set(new KeyBinding(['Control', 'X']), 'cut')
    keyMap.set(new KeyBinding(['Control', 'C']), 'copy')
    keyMap.set(new KeyBinding(['Control', 'V']), 'paste')
}

function onKeyDown(event) {
    switch(keyMap.match(event)) {
        case 'cut':
            // do cut
            break
        case 'copy':
            // do copy
            break
        case 'paste':
            // do paste
            break
    }
}
```

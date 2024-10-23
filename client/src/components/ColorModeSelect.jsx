import { useColorScheme, MenuItem, Select } from '@mui/material';

export default function ColorModeSelect(props) {
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    return (
        <Select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            SelectDisplayProps={{
                'data-screenshot': 'toggle-mode',
            }}
            {...props}
        >
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
        </Select>
    );
}
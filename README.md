# Cave Terminal

A dark theme mod for Claude: an underground command-center computer. Near-black
stone, gunmetal steel panels, cold blue monitor light and red alert accents,
over an animated backdrop with a monitor wash from above, a faint red standby
glow, stone grain and steady CRT scanlines.

The theme draws in the Claude desktop and mobile apps. Terminal and editor
sessions don't draw themes, so it has no effect there.

## Install

At the prompt of a terminal Claude Code session:

```
/plugin install cave-terminal --marketplace JuanJ1019/cave-terminal
```

Answer `y` to add the marketplace, then choose the user scope.

From a shell:

```bash
claude plugin install cave-terminal --marketplace JuanJ1019/cave-terminal
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt
box, then **Plugins**, **Add marketplace** with `JuanJ1019/cave-terminal`, then
**Add plugin**.

This repository is private: installing it needs read access to it on GitHub and
a git credential for github.com on your machine (an SSH key, or `gh auth login`
then `gh auth setup-git`). The install never prompts for one.

## Files

- `hooks/register.tsx`: the palette and the backdrop scene
- `hooks/make-colors.js`: turns the palette's seed colors into the app's design-system colors

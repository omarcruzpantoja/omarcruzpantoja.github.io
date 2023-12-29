##### CUSTOM FUNCTIONS #####
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

##### ALIASES #####
alias python="python3"


# COLORS FOR PS1
RS="\[\033[0m\]"    # reset
FBLK="\[\033[30m\]" # foreground black
FRED="\[\033[31m\]" # foreground red
FGRN="\[\033[32m\]" # foreground green
FYEL="\[\033[33m\]" # foreground yellow
FBLE="\[\033[34m\]" # foreground blue
FMAG="\[\033[35m\]" # foreground magenta
FCYN="\[\033[36m\]" # foreground cyan
FWHT="\[\033[37m\]" # foreground white

##### FUNCTIONS
# function to set terminal title  
function set-title() {
  if [[ -z "$ORIG" ]]; then
    ORIG=$PS1
  fi
  TITLE="\[\e]2;$*\a\]"
  PS1=${ORIG}${TITLE}
}


force_color_prompt=yes

# linux bash content
PS1="$FMAG\t $FCYN[\w] $FRED\$(parse_git_branch)$FCYN-> $RS"

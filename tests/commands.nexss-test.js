module.exports = {
  nexsstests: [
    {
      params: [
        `nexss js run "console.log('xxxx')"`,
        /To display help add 'help': nexss command help OR nexss package help/,
      ],
    },
    {
      params: [
        `nexss Output/End "works on Ubuntu" --platform:check="UBUNTU" --platform:noerror`,
        /WARN WARN:  Nexss Programmer: UBUNTU did not match with your platform win32, WINDOWS10 or WINDOWS. But program WILL continue/i,
      ],
    },
    {
      params: [
        `echo '{"array":["x","y","z"]}' | nexss Id --nxsSelect=array`,
        /"Select":"x","Select_2":"y","Select_3":"z"/,
      ],
    },
  ],
};

//**********appAtTriggerTime**********
// Global Variables for this script
APPL.env=APPL._event.substring(0,3);    //where the application runs: DEV, PRD, ...
APPL.appName=APPL._name.split('_');  //Used to determine what the name of the System is up to the '_' delimeter
APPL.sysID=APPL.appName[0]; //System ID is the first string separated by the delimeter
APPL.ver=APPL.sysID.substring(6,8);
APPL.currDateTime=APPL._SYEAR + APPL._SMM + APPL._SDD + '.' + APPL._SHH + APPL._SMN + APPL._SSS;
APPL.currDateYMD=APPL._SYEAR + APPL._SMM + APPL._SDD;
APPL.currTime=APPL._SHH + APPL._SMN + APPL._SSS;
//===========================================================
//MAIN()
function GETPREVIOUSDATE(){
var d = new Date();
    var month = d.getMonth();
    if(month < 10)
     month = '0' + month;
  var dd = d.getDate() - 1;
    var n = d.getFullYear() + '-' + month + '-' + dd;
return n;
}
APPL.prevDate=GETPREVIOUSDATE();
GLBL();
USER();
//===========================================================
//Common variables for all Systems
function GLBL() {
	//This is the PRE variables for GLBL
	loadContext(APPL,'ZEKE_VARS');
	if (APPL.env == "PRD") {
		loadContext(APPL,'APP_TRIGGER_GLBL_PRDPRE');
	} else {
		loadContext(APPL,'APP_TRIGGER_GLBL_NONPRDPRE');

		switch (APPL.env) {
			case 'DEV':
				loadContext(APPL,'APP_TRIGGER_GLBL_DEVPRE');
			break;
			case 'SYT':
				loadContext(APPL,'APP_TRIGGER_GLBL_SYTPRE');
			break;
			case 'UAT':
				loadContext(APPL,'APP_TRIGGER_GLBL_UATPRE');
			break;
		}
	}
	loadContext(APPL,'APP_TRIGGER_GLBL_ALL');
	APPL.windir='C:\\WINDOWS';
	APPL.itdPrtSrv='US001PS02V';
	APPL.mfPrtSrv = 'US01PPS005';
	APPL.mfPrtSrv1 = 'us001ps03V';
	APPL.batchShare='\\\\US01PFS022\\Cyber_Temp$';
	APPL.CODESERVER='\\\\US01PFS022\\cyber_batch$';
	APPL.BATCHUTILDIR=APPL.CODESERVER + '\\BATCH_UTILITIES\\' + APPL.env;
	APPL.FTPVBS=APPL.BATCHUTILDIR + '\\cybermation_ftp.vbs';
	APPL.FTPVBSNOFILE=APPL.BATCHUTILDIR + '\\cybermation_ftp_nofile.vbs';
	APPL.codeDir=APPL.CODESERVER + '\\' + APPL.sysID + '\\' + APPL.env;
	APPL.codeFtpDir=APPL.FTPVBS + ' ' + APPL.codeDir + '\\FTP';
	APPL.codeFtpDirNoFile=APPL.FTPVBSNOFILE + ' ' + APPL.codeDir + '\\FTP';
	APPL.exeDir=APPL.codeDir + '\\EXE';
	APPL.codeExeDir='/C ' + APPL.exeDir;
	APPL.codePwrShDir=APPL.codeDir + '\\PWRSH';
	APPL.codeJavaDir=APPL.codeDir + '\\JAVA';
	APPL.codeScriptDir=APPL.codeDir + '\\SCRIPT';
	APPL.DataDir=APPL.codeDir + '\\DATA';
	APPL.codeSSRSDir=APPL.codeDir + '\\SSRS';
	APPL.sqlDir=APPL.codeDir + '\\SQL';
	APPL.ReportDir=APPL.codeDir + '\\REPORTS';
	APPL.batchDir=APPL.sysID + '\\' + APPL.env;
	APPL.BATCHTMPROOT=APPL.batchShare + '\\' + APPL.batchDir;
	APPL.sqlOutputDir='-o ' + APPL.BATCHTMPROOT;
	APPL.archShare='\\\\US01PFS022\\batcharch$';
	APPL.archRoot=APPL.archShare + '\\' + APPL.batchDir;
	APPL.archDataDir=APPL.archRoot + '\\DATA';
	APPL.archReportDir=APPL.archRoot + '\\REPORTS';
	APPL.cmdStrShell=APPL.windir + '\\SYSTEM32\\CMD.EXE';
	APPL.cmdStrShellCls='/C';
	APPL.cmdOptYes='/Y';
	APPL.cmdStrPowerShell=APPL.windir + '\\SYSTEM32\\windowspowershell\\v1.0\\powershell.exe';
	APPL.cmdStrPowerShell32=APPL.windir + '\\SysWOW64\\windowspowershell\\v1.0\\powershell.exe';
	APPL.CMDSTRSHELLARCHIVE='/C ' + APPL.BATCHUTILDIR + '\\archiveloop.bat ' + APPL.currDateTime;
	APPL.cmdStrShellMoveCopy='/C ' + APPL.BATCHUTILDIR + '\\movecopy-loop.bat';
	APPL.cmdStrPrint=APPL.windir + '\\SYSTEM32\\print.EXE';
	APPL.cmdStrShellDel='/C del /Q /S';
	APPL.cmdStrShellMove='/C move /Y';
	APPL.cmdStrShellDump='/C copy /Y nul';
	APPL.cmdStrCscript=APPL.windir + '\\system32\\cscript.exe';
	APPL.cmdStrFtp=APPL.cmdStrCscript;
	APPL.cmdStrFileProperty='/C  dir';
	APPL.cmdStrFileEmptyYes='| find " 0 bytes"';
	APPL.cmdStrSort=APPL.windir + '\\SYSTEM32\\ahlsort.exe';
	APPL.cmdStrCopy=APPL.cmdStrShell;
	APPL.cmdStrCopyRepArgs='/C ' + APPL.BATCHUTILDIR + '\\copyloop.bat';
	APPL.cmdStrShellCopy=APPL.cmdStrCopyRepArgs;
	APPL.cmdStrShellPrint=APPL.cmdStrShellCopy;
	APPL.CMDSTRFORALL=APPL.CMDSTRSHELLARCHIVE;
	APPL.cmdStrMoveAs=' MOVE ';
	APPL.cmdStrCopyAs=' COPY ';
	APPL.CMDSTRSSRSINF='-l 600 -s ' + APPL.REPORTSSERVER + ' -i ' + APPL.codeSSRSDir;
	APPL.cmdStrSSRSVar='-v';
	APPL.cmdStrSSRSExec='-e';
	APPL.CMDSTRJAVA=APPL.BATCHUTILDIR + '\\Java\\jre\\bin\\java.exe';
	APPL.cmdStrJavaJar='-cp ' + APPL.codeJavaDir;
	APPL.emailVBS=APPL.BATCHUTILDIR + '\\email.vbs';
	APPL.WSFTP='"C:\\Program Files (x86)\\Ipswitch\\WS_FTP 12\\ftpscrpt.com -f "';
	APPL.webBatchJar='-cp ' + APPL.BATCHUTILDIR + '\\WebBatch.jar org.acgov.batch.WebBatch.class';
	APPL.cmdStrType='/C TYPE';
	APPL.cmdStrXCopy=APPL.windir + '\\system32\\xcopy.exe';
	APPL.xCopyArgs='/D /E /I /F /H /R /Y';
	APPL.xCopyExclude=APPL.xCopyArgs + ' /exclude';
	APPL.checkEmptyFolder='/C ' + APPL.BATCHUTILDIR + '\\checkFolderEmpty.bat';
	APPL.CMDSTRZIP='C:\\Program Files\\WinZip\\wzzip.exe';
	APPL.CMDSTRUNZIP='C:\\Program Files\\WinZip\\wzunzip.exe';
	APPL.cmdStrZipFileArgs='-yb -^^ -whs -en';
	APPL.cmdStrZipFolderArgs='-yb -^^ -whs -en -P -r';
	APPL.cmdStrUnZipArgs='-yb -^^ -d -o';
	APPL.cmdStrDelEmptyDir=APPL.BATCHUTILDIR + '\\delete_empty_folder.vbs';
	APPL.cmdStrDir='/c Dir';
	APPL.cmdStrAppend='/c COPY /Y';
	APPL.cmdStrVERIMOVE='/c \\\\us01pap130\\D$\\PB\\VeriMove\\FtCmd.exe';
	APPL.cmdStrBCP='C:\\Program Files\\Microsoft SQL Server\\110\\Tools\\Binn\\bcp.EXE';
	//Arguments for listing files in a directory
	APPL.cmdListFiles='/C DIR /B /A:-D';
	APPL.cmdRedirect='>';
	APPL.cmdStrPython = '/C C:\\Python27\\ArcGIS10.2\\python.exe';
	APPL.cmdStrPython10v3 = '/C C:\\Python27\\ArcGIS10.3\\python.exe';
	//Arguments for Archive Move/Copy
	APPL.cmdStrArchMoveData='MOVE ' + APPL.archDataDir;
	APPL.cmdStrArchMoveReport='MOVE ' + APPL.archReportDir;
	APPL.cmdStrArchCopyData='COPY ' + APPL.archDataDir;
	APPL.cmdStrArchCopyReport='COPY ' + APPL.archReportDir;
	if (APPL.env == "PRD") {
		loadContext(APPL,'APP_TRIGGER_GLBL_PRDPST');
	} else {
		loadContext(APPL,'APP_TRIGGER_GLBL_NONPRDPST');
	}
}
//===========================================================
//Common variables for all Systems PeopleSoft
function PS() {
	//This is the PRE variables for PS
	if (APPL.env == "PRD") {
		loadContext(APPL,'APP_TRIGGER_PS_PRDPRE');
	} else {
		loadContext(APPL,'APP_TRIGGER_PS_NONPRDPRE');
		switch (APPL.env) {
			case 'DEV':
				loadContext(APPL,'APP_TRIGGER_PS_DEVPRE');
			break;
			case 'SYT':
				loadContext(APPL,'APP_TRIGGER_PS_SYTPRE');
			break;
			case 'UAT':
				loadContext(APPL,'APP_TRIGGER_PS_UATPRE');
			break;
			case 'USR':
				loadContext(APPL,'APP_TRIGGER_PS_USRPRE');
			break;
			case 'TRN':
				loadContext(APPL,'APP_TRIGGER_PS_TRNPRE');
			break;
			case 'PST':
				loadContext(APPL,'APP_TRIGGER_PS_SYTPRE');
			break;
			case 'PDV':
				loadContext(APPL,'APP_TRIGGER_PS_PDVPRE');
			break;
		}
	}
	APPL.AGENTUSER=APPL.psType + 'XBATCH';
	APPL.dbUser=APPL.AGENTUSER;
	APPL.CODESERVER='acclus01';
//Dirs
	APPL.scriptDir='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psenv + '\\scripts';
	APPL.codeDir='\\\\' + APPL.CODESERVER +'\\src$\\' + APPL.psenv + '\\src\\parm';
	APPL.BATCHUTILDIR='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psType + 'XBATC~1\\DOSUtils';
	APPL.codeFtpDir=APPL.FTPVBS + ' ' + APPL.codeDir;
	APPL.codeFtpDirNoFile=APPL.FTPVBSNOFILE + ' ' + APPL.codeDir;
	APPL.CODESQLDIR='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.psenv + ' -i '+ APPL.codeDir;
	APPL.batchShare='\\\\Acclus02\\batchtmp$';
	if (APPL.env == "PDV") {
		APPL.batchDir=APPL.sysID + '\\' + APPL.psType+ 'PDDEV92';
	}
	if (APPL.env == "PST") {
		APPL.batchDir=APPL.sysID + '\\' + APPL.psType+ 'PDSYT92';
	} else {
		APPL.batchDir=APPL.sysID + '\\' + APPL.psenv;}
	APPL.BATCHTMPROOT=APPL.batchShare + '\\' + APPL.batchDir;
	APPL.codeSqlSPUFI='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.psenv + ' -i '+ APPL.codeSPUFIDir;
	APPL.srcFormsDir=APPL.batchFormsDir;
	APPL.srcIntfDir=APPL.BATCHINTFDIR;
	APPL.srcViewDir=APPL.batchViewDir;
	APPL.tgtViewDirNT='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'NT' + '\\' + APPL.VDDIREND; // + APPL._env;
	APPL.tgtViewDirMF='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'MF' + '\\' + APPL.VDDIREND; // + APPL._env;
	APPL.archRoot=APPL.archShare + '\\' + APPL.batchDir;
	APPL.archFormsDir=APPL.archRoot + '\\FORMS';
	APPL.archIntfDir=APPL.archRoot + '\\Interface';
	APPL.archViewDir=APPL.archRoot + '\\toViewDirect';
	APPL.archPrintDir=APPL.archRoot + '\\toPrint';
	APPL.archSPUFIDir=APPL.archRoot + '\\SPUFI';
	APPL.archWarrantsDir=APPL.archRoot + '\\Warrants';
	APPL.archXmlDataDir=APPL.archRoot + '\\XmlData';
	//database string
	APPL.dbConnStr='jdbc:sqlserver://' + APPL.DBSERVER + ':1433;DatabaseName=' + APPL.psenv;
	//zOS
	APPL.ZOSDSPREFIX=APPL.psType + 'X.P' + APPL.psType +'X'; //FX.PFX for prd fx
	APPL.ZOSDSFTPPREFIX='FTP.P' + APPL.psType +'X';
	if ( APPL.env == 'DEV' || APPL.env == 'UAT' ) {
	   	APPL.ZOSDSPREFIX=APPL.psType + 'X.T' + APPL.psType +'X';
		APPL.ZOSDSFTPPREFIX='FTP.T' + APPL.psType +'X';
	}
	APPL.ZOSFTPUSER='PSOFTPB';	//for prd only
	if ( APPL.env == 'DEV' ) APPL.ZOSFTPUSER='PSOFTVB';
	if ( APPL.env == 'UAT' ) APPL.ZOSFTPUSER='PSOFTWB';
	if ( APPL.env == 'USR' ) APPL.ZOSFTPUSER='PSOFTRB';
	if ( APPL.env == 'SYT' ) APPL.ZOSFTPUSER='PSOFTYB';
	APPL.ZOSDS3NODE=APPL.env;
	if ( APPL.ZOSDS3NODE == 'UAT' ) APPL.ZOSDS3NODE='USR';
	if ( APPL.ZOSDS3NODE == 'USR' ) APPL.ZOSDS3NODE='TRN';
	if ( APPL.ZOSDS3NODE == 'PRD' ) APPL.ZOSDS3NODE='TMP';

	APPL.CMDSTROSQL='C:\\Program Files\\Microsoft SQL Server\\110\\Tools\\Binn\\sqlcmd.EXE';
	APPL.cmdStrForAllR='';
	APPL.cmdStrForAllF='';
	APPL.cmdStrArch='';
	APPL.cmdStrArchMoveForms='MOVE ' + APPL.archFormsDir;
	APPL.cmdStrArchMoveIntf='MOVE '+ APPL.archIntfDir;
	APPL.cmdStrArchMoveToView='MOVE ' + APPL.archViewDir;
	APPL.cmdStrArchMoveToPrint='MOVE ' + APPL.archPrintDir;
	APPL.cmdStrArchMoveSPUFI='MOVE ' + APPL.archSPUFIDir;
	APPL.cmdStrArchMoveWarrants='MOVE ' + APPL.archWarrantsDir;
	APPL.cmdStrArchMoveXmlData='MOVE ' + APPL.archXmlDataDir;
	APPL.cmdStrArchCopyForms='COPY ' + APPL.archFormsDir;
	APPL.cmdStrArchCopyIntf='COPY ' + APPL.archIntfDir;
	APPL.cmdStrArchCopyToView='COPY ' + APPL.archViewDir;
	APPL.cmdStrArchCopyToPrint='COPY ' + APPL.archPrintDir;
	APPL.cmdStrArchCopySPUFI='COPY ' + APPL.archSPUFIDir;
	APPL.cmdStrArchCopyWarrants='COPY ' + APPL.archWarrantsDir;
	APPL.CMDSTRSSIS='C:\\Program Files (x86)\\Microsoft SQL Server\\110\\DTS\\Binn\\DTExec.exe';
}
//===========================================================
//POST Common variables for all Systems
function POST(){
	//Checks if Prod or Not Prod
	if (APPL.env == "PRD") {//Production Specific Settings
	} else {//Non-Production Specific Settings
	}
	APPL.CMDSTRSSISPKG='/SER ' + APPL.DBSERVER + ' /REP V /SUM /SQ ' + APPL.PKGLOC;
	APPL.cmdStrSSISPkgRptSvr='/SER ' + APPL.DBREPORTSERVER + ' /REP V /SUM /SQ ' + APPL.PKGLOC;
	APPL.CODESQLDIR='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.DBTABLE + ' -i '+ APPL.codeDir + '\\SQL';
	APPL.CODESQLQUERY='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.DBTABLE + ' -Q';
}
//===========================================================
//This function is the overall class for PSHRMS92.
function PSHRMS92(){
	APPL.psType=APPL.sysID.substring(2,3);  //gets the first letter of env to determine if Fin or HR
	APPL.psenv=APPL.psType + 'XD' + APPL.env + APPL.ver;
	if (APPL.env == "PDV") {	APPL.psenv=APPL.psType + 'PDDEV' + APPL.ver;}
	if (APPL.env == "PST") {	APPL.psenv=APPL.psType + 'PDSYT' + APPL.ver;}
	APPL.codeServer='acclus01';
	APPL.BATCHINTFDIR='\\\\' + 'US01PFS022' + '\\hrinterface$';
	APPL.BATCHSERVER='US01PFS022';
	APPL.BATCHSERVERFX='US01PFS022';
	APPL.WARRANTSDIR='\\\\us01pfs022\\hrwarrants$';
	APPL.batchViewDir='\\\\' + 'US01PFS022' + '\\hrtoviewdirect$';
	APPL.batchFormsDir='\\\\' + 'US01PFS022' + '\\hrforms$';
	APPL.scriptDir='\\\\' + APPL.codeServer + '\\src$\\' + APPL.psenv + '\\scripts';
	APPL.codeDir='\\\\' + APPL.codeServer +'\\src$\\' + APPL.psenv + '\\src\\parm';
	APPL.BATCHUTILDIR='\\\\' +APPL.codeServer + '\\src$\\' + APPL.psType + 'XBATC~1\\DOSUtils';
	APPL.codeFtpDir=APPL.ftpVBS + ' ' + APPL.codeDir;
	APPL.codeFtpDirNoFile=APPL.ftpVBSNOFILE + ' ' + APPL.codeDir;
	APPL.batchShare='\\\\Acclus02\\batchtmp$';
	APPL.batchDir=APPL.sysID + '\\' + APPL.psenv;
	APPL.BATCHTMPROOT=APPL.batchShare + '\\' + APPL.batchDir;
	APPL.toPrintDir='\\\\' + 'US01PFS022' + '\\hrtoPrint$';
	APPL.codeSPUFIDir='\\\\' + 'US01PFS022' + '\\hrspufi$\\approved';
	APPL.sysOut='\\\\' + 'US01PFS022' + '\\hrsysout$\\sysout';
	APPL.srcFormsDir=APPL.batchFormsDir;
	APPL.srcIntfDir=APPL.BATCHINTFDIR;
	APPL.srcViewDir=APPL.batchViewDir;
	APPL.archRoot=APPL.archShare + '\\' + APPL.batchDir;
	APPL.archFormsDir=APPL.archRoot + '\\FORMS';
	APPL.archIntfDir=APPL.archRoot + '\\Interface';
	APPL.archViewDir=APPL.archRoot + '\\toViewDirect';
	APPL.archPrintDir=APPL.archRoot + '\\toPrint';
	APPL.archSPUFIDir=APPL.archRoot + '\\SPUFI';
	APPL.archWarrantsDir=APPL.archRoot + '\\Warrants';
	APPL.archXmlDataDir=APPL.archRoot + '\\XmlData';
	APPL.tgtViewDirNT='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'NT' + '\\' + APPL.VDDIREND; // + 'fxusr';
	APPL.tgtViewDirMF='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'MF' + '\\' + APPL.VDDIREND; // + 'fxusr';
	APPL.tgtInterfaceFin='\\\\us01pfs022\\interfacedev$';
	APPL.PRTHR='\\\\' + APPL.BATCHSERVER + '\\hrforms$\\TestPrint';
	APPL.PRT3EBC=APPL.PRTHR;
	APPL.PRT3MRN=APPL.PRTHR;
	APPL.PRT3MRNS=APPL.PRTHR;
	APPL.PRT3HXW2=APPL.PRTHR;
	APPL.PRT3HXAD=APPL.PRTHR;
	APPL.PRTHXBP=APPL.PRTHR;
	APPL.MAILPSHXTAALL='developers@acgov.org';
	APPL.MAILPSHXTACENTRAL='developers@acgov.org';
	APPL.MAILPSHXESCManager='developers@acgov.org';
	APPL.MAILPSHXESCSUPERVISOR='';
	APPL.MAILPSHXESCPERSON='';
	APPL.MAILPSHXESCGROUP='developers@acgov.org';  //AD Group added to replace individual addresses per AChowdhury - 02/27/2008
	APPL.MAILPSHXCHECKPRINT='developers@acgov.org';
	APPL.MAILOPSNOTIFY='developers@acgov.org';
	APPL.MAILPSHXEXPENDITURES='developers@acgov.org';
	APPL.MAILPSHXEMAIL_PUBLICWORKS='developers@acgov.org';
	APPL.MAILPSHXSSATLINT='developers@acgov.org';
	APPL.MAILPRTLADMINTRATOR='developers@acgov.org';
	APPL.MAILPSHXEMAIL_PUBLICHEALTH='developers@acgov.org';
	APPL.MAILPSHXHRPULLINTERFACE='developers@acgov.org';
	APPL.MAILPSHXITDPSU='developers@acgov.org';
	APPL.BATCHINTFFINDIR='\\\\' + APPL.BATCHSERVERFX + '\\interfacedev$';
	APPL.BATCHINTFHXFINDIR=APPL.BATCHINTFFINDIR + '\\HRMS';
	if (APPL.env == "PRD" || APPL.env == "PFT") {//Checks if Prod or Not Prod
		//Production Specific Settings
		APPL.DBSERVER='US01PDB031V';
		APPL.DBRECOVERY='FULL';
		APPL.PSNTSERVER01='US01PAP021';
		APPL.PSNTSERVER02='US01PAP022';
		APPL.APPSRVER01='US01PAP014';
		APPL.APPSRVER02='US01PAP015';
		APPL.APPSRVER03='US01PAP016';
		APPL.INTERAS01='US01PAP029';
		APPL.INTERAS02='US01PAP045';
		APPL.WEBSRVER01='US01PWS013';
		APPL.WEBSRVER02='US01PWS014';
		APPL.WEBSRVER03='US01PWS015';
		APPL.INTERWS01='US01PWS016';
		APPL.INTERWS02='US01PWS017';
		APPL.PRTHR='\\\\' + APPL.itdPrtSrv + '\\ITD.MAD.RM336.HP.8150.PS';
		APPL.PRT3MRN = '\\\\' + APPL.mfPrtSrv + '\\IP2KNHD1';
		APPL.PRT3EBC = '\\\\' + APPL.mfPrtSrv1 + '\\HRS.EBC.KONICA.C754';
		APPL.PRT3MRNS='\\\\' + APPL.mfPrtSrv + '\\IP2KNHS1';
		APPL.PRT3HXW2='\\\\' + APPL.mfPrtSrv + '\\IP2KHXW2';
		APPL.PRT3HXAD='\\\\' + APPL.mfPrtSrv + '\\IP2KHXAD';
		APPL.PRTHXBP='\\\\' + APPL.mfPrtSrv + '\\IP2KHXBP';
		APPL.MAILPSHXTAALL='tadmin1@acgov.org';
		APPL.MAILPSHXTACENTRAL='tadmin2@acgov.org';
		APPL.MAILPSHXESCManager='ava.lavender@acgov.org';
		APPL.MAILPSHXESCSUPERVISOR='estela.castillo@acgov.org';
		APPL.MAILPSHXESCPERSON='daisy.tabili@acgov.org';
		APPL.MAILPSHXESCGROUP='HRESC@acgov.org';  //AD Group added to replace individual addresses per AChowdhury - 02/27/2008
		APPL.MAILPSHXCHECKPRINT='itdhelpdesk@acgov.org';
		APPL.MAILOPSNOTIFY='opsnotify@acgov.org';
		APPL.MAILPSHXEXPENDITURES='John.Zhang@acgov.org';
		APPL.MAILPSHXEMAIL_PUBLICWORKS='tlintpb@acgov.org';
		APPL.MAILPSHXSSATLINT='TLINTSSA@acgov.org';
		APPL.MAILPRTLADMINTRATOR='AuditorPRTLADMIN@acgov.org, developers@acgov.org';
		APPL.MAILPSHXEMAIL_PUBLICHEALTH='HR_PBHLTH@acgov.org, developers@acgov.org';
		APPL.MAILPSHXHRPULLINTERFACE='HR_Pull_Interface@acgov.org';
		APPL.MAILPSHXITDPSU='allpsu@acgov.org';
		APPL.tgtViewDirNT='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'NT' + '\\' + 'fxprd';
		APPL.tgtViewDirMF='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'MF' + '\\' +'fxprd';
		APPL.tgtInterfaceFin='\\\\US01PFS022\\fininterface$';
		APPL.db2OID='HXAOWNP';
	} else {
		if (APPL.env == "TRN" || APPL.env == "UAT" || APPL.env == "USR") {
			APPL.DBSERVER='US01TDB031V';
			APPL.DBRECOVERY='FULL';
			APPL.PSNTSERVER01='US01UAP006';
			APPL.APPSRVER01='US01UAP003';
			APPL.APPSRVER02='US01UAP004';
			APPL.INTERAS01='US01UAP007';
			APPL.INTERAS02='US01UAP008';
			APPL.WEBSRVER01='US01UWS003';
			APPL.WEBSRVER02='US01UWS004';
			APPL.INTERWS01='US01DWS004';
			APPL.INTERWS02='US01DWS005';
		}
		if (APPL.env == "DEV" || APPL.env == "DLY" || APPL.env == "SYT") {
			if (APPL.psenv.substring(0,2) == "HX" || APPL.psenv.substring(0,2) == "SM") {
				APPL.DBSERVER='US01DDB031V';
				APPL.DBRECOVERY='SIMPLE';
				APPL.PSNTSERVER01='US01DAP005';
				APPL.APPSRVER01='US01DAP004';
				APPL.WEBSRVER01='US01DWS003';
				APPL.INTERWS01='US01DWS003';
			}
			if (APPL.psenv.substring(0,2) == "HP" || APPL.psenv.substring(0,2) == "SP") {
				APPL.DBSERVER='US01DDB031V';
				APPL.DBRECOVERY='SIMPLE';
				APPL.PSNTSERVER01='US01DAP016';
				APPL.APPSRVER01='US01DAP015';
				APPL.WEBSRVER01='US01DWS007';
				APPL.INTERWS01='US01DWS007';
			}
		}
		if (APPL.env == "PDV" || APPL.env == "PST") {
				APPL.DBSERVER='US01DDB031V';
				APPL.DBRECOVERY='SIMPLE';
				APPL.PSNTSERVER01='US01DAP016';
				APPL.APPSRVER01='US01DAP015';
				APPL.WEBSRVER01='US01DWS007';
				APPL.INTERWS01='US01DWS007';
		}
	}
	APPL.psNTptHome=APPL.psNTdrive + ':\\' + APPL.psRootDir + '\\PT85515';
	// Wei-min Lee 03/05/09 - Paths for UPK
	// Chandra Reed-Wilkerson 02/04/14 modified path to include UNC for PSHOME
	APPL.upkDst01='"\\\\' + APPL.WEBSRVER01 + '\\D$\\PSOFT\\PT85515\\webserv\\pshr-85515\\applications\\peoplesoft\\HRPRDUPK\\PlayerPackage"';
	APPL.upkDst02='"\\\\' + APPL.WEBSRVER02 + '\\D$\\PSOFT\\PT85515\\webserv\\pshr-85515\\applications\\peoplesoft\\HRPRDUPK\\PlayerPackage"';
	APPL.upkDst03='"\\\\' + APPL.WEBSRVER03 + '\\D$\\PSOFT\\PT85515\\webserv\\pshr-85515\\applications\\peoplesoft\\HRPRDUPK\\PlayerPackage"';
	// Chandra Reed-Wilkerson 01/30/15 modified path to include UNC for PREQ Player Package
	APPL.PREQupkDst01='"\\\\' + APPL.WEBSRVER01 + '\\D$\\PSOFT\\PT85515\\webserv\\pshr-85515\\applications\\peoplesoft\\PREQUPK\\PlayerPackage"';
	APPL.PREQupkDst02='"\\\\' + APPL.WEBSRVER02 + '\\D$\\PSOFT\\PT85515\\webserv\\pshr-85515\\applications\\peoplesoft\\PREQUPK\\PlayerPackage"';
	APPL.PREQupkDst03='"\\\\' + APPL.WEBSRVER03 + '\\D$\\PSOFT\\PT85515\\webserv\\pshr-85515\\applications\\peoplesoft\\PREQUPK\\PlayerPackage"';
	// Wei-min Lee 05/20/09 - PIA service name
	APPL.psPIAservice='pshr-85515-' + APPL.psenv;
	APPL.CODESQLDIR='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.psenv + ' -i '+ APPL.codeDir;
	APPL.codeSqlSPUFI='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.psenv + ' -i '+ APPL.codeSPUFIDir;
	switch (APPL.env) {
		case 'DEV':
			APPL.db2OID='HXAOWND';
		break;
		case 'SYT':
			APPL.db2OID='HXAOWNT';
		break;
		case 'UAT':
			APPL.db2OID='HXAOWNR';
		break;
		case 'USR':
			APPL.db2OID='HXAOWNR';
		break;
		case 'TRN':
			APPL.db2OID='HXAOWNR';
		break;
	}
	//deterimine schedules for special interfaces
	//from Teresa Young
	this.provider_interface=false;
	this.every_other_interface=false;
	if (today('INTERFACE')) {
		mdays=daysFrom('December 19, 2006');
		if (today('Tuesday')) {
			genTime('checkdt','Today less 4 days');
			genTime('nextchkdt','Today plus 10 days');
			if (checkdtMM != nextchkdtMM){
				this.provider_interface=true;
			}
		} else {
			// this must be monday
			mdays ++;
			genTime('checkdt','Today less 3 days');
			genTime('nextchkdt','Today plus 11 days');
			if (checkdtMM != nextchkdtMM) {
				this.provider_interface=true;
			}
		}
		if (mdays%28==0) {
			this.every_other_interface=true;
		}
	}
	// determine between TL_ENTRY, LOAD and CONFIRM
	// workaround Cybermation defect
	this.between_tl_load= false;
	this.between_load_confirm = false;
	if ( !today('TL_ENTRY')  && !today('LOAD') && !today('CONFIRM')) {
		if (yesterday('TL_ENTRY')) {
			this.between_tl_load=true;
		} else {
			days_load = daysTo('LOAD');
	 		if (days_load <= 4) {
				this.between_tl_load=true;
			}
 	  }
		if (yesterday('LOAD')) {
 			this.between_load_confirm=true;
 	  } else {
 			days_confirm = daysTo('CONFIRM');
			if (days_confirm <= 5) {
				this.between_load_confirm=true;
			}
		}
	}
	// determine off_cycle
	// workaround Cybermation defect
	this.off_cycle= false;
	if ( !tomorrow('CONFIRM') && !today('INTERFACE')  && !today('LOAD') && !today('CONFIRM')) {
		if (yesterday('CONFIRM')) {
			this.off_cycle=true;
		} else {
			days_interface = daysTo('INTERFACE');
			if (days_interface <= 7) {
				this.off_cycle=true;
			}
	  }
  }
	PS();

	if (APPL.env == "PRD" || APPL.env == "PFT") {//Checks if Prod or Not Prod
		//Production Specific Settings
		APPL.ESCSHARE='\\\\acclus02\\HR_HXBatch$';
		APPL.audShare='\\\\acclus01\\alcolinkHRMS$';
		APPL.GSASHARE='\\\\acclus02\\GSADATA$\\Motor_V\\GASCARDS';
		APPL.centralHRShare='\\\\acclus02\\CentralHR$';
		//used to change location of the new ftp script;  Needs to be declared after PS() function
		APPL.FTPVBS='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psenv + '\\scripts\\cybermation_ftp.vbs';
		APPL.FTPVBSNOFILE='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psenv + '\\scripts\\cybermation_ftp_nofile.vbs';
		APPL.WSFTP='"C:\\Program Files (x86)\\Ipswitch\\WS_FTP 12\\ftpscrpt.com -f "';
	} else {
		//Non-Production Specific Settings
		APPL.ESCSHARE='\\\\' + APPL.BATCHSERVER + '\\hrsysout$\\escShare\\' + APPL.psenv;
		APPL.audShare='\\\\' + APPL.BATCHSERVER + '\\hrsysout$\\audShare\\' + APPL.psenv;
		APPL.GSASHARE='\\\\' + APPL.BATCHSERVER + '\\hrsysout$\\GSAShare\\' + APPL.psenv;
		APPL.centralHRShare='\\\\' + APPL.BATCHSERVER + '\\sysout$\\centralHRShare\\' + APPL.psenv;
		//used to change location of the new ftp script;  Needs to be declared after PS() function
		APPL.FTPVBS='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psenv + '\\scripts\\cybermation_ftp.vbs';
		APPL.FTPVBSNOFILE='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psenv + '\\scripts\\cybermation_ftp_nofile.vbs';
		APPL.WSFTP='"C:\\Program Files (x86)\\Ipswitch\\WS_FTP 12\\ftpscrpt.com -f "';
	}
	APPL.UPDATEEMPIDARGS='/basedn:DC=USER,DC=ROOT,DC=ACGOV,DC=ORG /v:yes';
	APPL.ADSYNCARGS='//B //NOLOGO';
	APPL.UPDATEEMPIDARGS='/basedn:DC=USER,DC=ROOT,DC=ACGOV,DC=ORG /v:yes';
	APPL.ADSYNCINPUTARGS='/i:';
	APPL.ADSYNCOUTPUTARGS='/o:';
	APPL.ADSYNCDIR=APPL.BATCHINTFDIR + '\\' + APPL.psenv + '\\Outbound\\Email-Data\\HXSCI003';
	APPL.ADSYNCINPUTDIR=APPL.ADSYNCINPUTARGS + APPL.ADSYNCDIR;
	APPL.ADSYNCOUTPUTDIR=APPL.ADSYNCOUTPUTARGS + APPL.ADSYNCDIR;
	APPL.PKGLOC=APPL.psenv;
	APPL.CMDSTRSSISPKG='/SER ' + APPL.DBSERVER + ' /REP V /SUM /SQ ' + APPL.PKGLOC;
}
//===========================================================
//This function is the overall class for PSFSCM92.
function PSFSCM92(){
	APPL.psType=APPL.sysID.substring(2,3);  //gets the first letter of env to determine if Fin or HR
	APPL.psenv=APPL.psType + 'XD' + APPL.env + APPL.ver;
	if (APPL.env == "PDV") {APPL.psenv=APPL.psType + 'PDDEV' + APPL.ver;}
	if (APPL.env == "PST") {APPL.psenv=APPL.psType + 'PDSYT' + APPL.ver;}
	if (APPL.env == "DLY") {APPL.psenv=APPL.psType + 'XDDLY' + APPL.ver;}
	//This is the PRE variables for PSFSCM92
	if (APPL.env == "PRD") {
		loadContext(APPL,'APP_TRIGGER_PSFSCM92_PRDPRE');
	} else {
		loadContext(APPL,'APP_TRIGGER_PSFSCM92_NONPRDPRE');
		//Dirs
		APPL.BATCHSERVER='US01PFS022';
		APPL.BATCHINTFDIR='\\\\' + 'US01PFS022' + '\\interfacedev$';
		APPL.batchViewDir='\\\\' + 'US01PFS022' + '\\toviewdirectdev$';
		APPL.batchFormsDir='\\\\' + 'US01PFS022' + '\\forms$';
		APPL.scriptDir='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psenv + '\\scripts';
		APPL.codeDir='\\\\' + APPL.CODESERVER +'\\src$\\' + APPL.psenv + '\\src\\parm';
		APPL.BATCHUTILDIR='\\\\' + APPL.CODESERVER + '\\src$\\' + APPL.psType + 'XBATC~1\\DOSUtils';
		APPL.codeFtpDir=APPL.FTPVBS + ' ' + APPL.codeDir;
		APPL.codeFtpDirNoFile=APPL.FTPVBSNOFILE + ' ' + APPL.codeDir;
		APPL.CODESQLDIR='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.psenv + ' -i '+ APPL.codeDir;
		APPL.batchShare='\\\\Acclus02\\batchtmp$';
		APPL.batchDir=APPL.sysID + '\\' + APPL.psenv;
		APPL.BATCHTMPROOT=APPL.batchShare + '\\' + APPL.batchDir;
		APPL.toPrintDir='\\\\' + 'US01PFS022' + '\\toprintdev$';
		APPL.codeSPUFIDir='\\\\' + 'US01PFS022' + '\\spufidev$\\approved';
		APPL.codeSqlSPUFI='-E -I -e -b -S ' + APPL.DBSERVER + ' -d ' + APPL.psenv + ' -i '+ APPL.codeSPUFIDir;
		APPL.sysOut='\\\\' + 'US01PFS022' + '\\sysoutdev$\\sysout';
		APPL.srcFormsDir=APPL.batchFormsDir;
		APPL.srcIntfDir=APPL.BATCHINTFDIR;
		APPL.srcViewDir=APPL.batchViewDir;
		APPL.tgtViewDirNT='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'NT' + '\\' + APPL.VDDIREND; // + APPL._env;
		APPL.tgtViewDirMF='\\\\' + APPL.VDSERVER + '\\FTP_Root\\From' + 'MF' + '\\' + APPL.VDDIREND; // + APPL._env;
		APPL.archRoot=APPL.archShare + '\\' + APPL.batchDir;
		APPL.archFormsDir=APPL.archRoot + '\\FORMS';
		APPL.archIntfDir=APPL.archRoot + '\\Interface';
		APPL.archViewDir=APPL.archRoot + '\\toViewDirect';
		APPL.archPrintDir=APPL.archRoot + '\\toPrint';
		APPL.archSPUFIDir=APPL.archRoot + '\\SPUFI';
		APPL.archWarrantsDir=APPL.archRoot + '\\Warrants';
		APPL.archXmlDataDir=APPL.archRoot + '\\XmlData';
		switch (APPL.env) {
			case 'DEV':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_DEVPRE');
			break;
			case 'SYT':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_SYTPRE');
			break;
			case 'UAT':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_UATPRE');
			break;
			case 'USR':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_USRPRE');
			break;
			case 'TRN':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_TRNPRE');
			break;
			case 'PST':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_PSTPRE');
			break;
			case 'PDV':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_PDVPRE');
			break;
			case 'DLY':
				loadContext(APPL,'APP_TRIGGER_PSFSCM92_DLYPRE');
			break;
		}
	}
	APPL.CMDIEBASE='/C start /b /wait /d D:\\expedite iebase.exe AUTOMODE PATH='
	APPL.CMDIEBASEMSGARGPFX='/C for /f "tokens=*" %a in ('
	APPL.CMDIEBASEMSGARGSFX='\\baseout.msg) do @echo %a'
	APPL.CMDIEBASEERRCHKARGPFX='/c for /f "tokens=*" %a in ('
	APPL.CMDIEBASEERRCHKARGSFX='\\ERRORLVL) do @exit %a'
	//Run for Veterans day
	if (today('VETERANS_DAY')){
		if (today('Saturday') || today('Sunday')){
			APPL.vetsDay=false;
		} else {
			APPL.vetsDay=true;
		}
	} else {
		APPL.vetsDay=false;
	}
	loadContext(APPL,'APP_TRIGGER_PSFSCM92_ALL');
	PS();
	APPL.PKGLOC=APPL.psenv;
	APPL.CMDSTRSSISPKG='/SER ' + APPL.DBSERVER + ' /REP V /SUM /SQ ' + APPL.PKGLOC;
}
//===========================================================
//This function is the overall class for MWSVCSGP
function MWSVCSGP(){
	APPL.appName=APPL._name.split('_');
	APPL.sysID=APPL.appName[1];
	APPL.psType=APPL.sysID.substring(2,3);
	APPL.ver=APPL.sysID.substring(6,8);
	APPL.support="0";
	APPL.ADMEMAIL='CybermationAdmins@acgov.org';
	APPL.psNTdrive='D';
	APPL.psASdrive='D';
	APPL.psRootDir='PSOFT';
	switch (APPL.sysID) {
		case 'TECHSVCS':
			TECHSVCS();
		break;
		case 'DBAGROUP':
			DBAGROUP();
		break;
		case 'PSHRMS92':
			PSHRMS92();
			// AVOID USING THIS AREA EXCEPT TO OVERRIDE THE PRIMARY SECTION FOR PSHRMS92
			APPL.support="1";  //This is needed as PS has there own variables that we do not want to over-write.
			// Wei-min Lee 03/05/09 - Paths for UPK
			APPL.upkSrc='"\\\\' + APPL.CODESERVER + '\\DOC$\\UPK_Publish\\HRMS\\Publishing Content\\PlayerPackage"';
			// Wei-min Lee 03/20/09 - Paths for report manager
			APPL.psRMroot='\\\\' + APPL.CODESERVER + '\\alreport$\\HR\\';
			APPL.psRMpath=APPL.psRMroot + APPL.psenv;
			APPL.psNTptHome=APPL.psNTdrive + ':\\' + APPL.psRootDir + '\\PT85515';
			APPL.psPIAservice='pshr-85515-PIA';
			if (APPL.env == "PRD" ) {
				// Wei-min Lee 03/05/09 - Paths for UPK
				APPL.upkDst=APPL.psNTptHome + '\\webserv\\pshr-85515\\applications\\peoplesoft\\HRPRDUPK\\PlayerPackage';
			} else {
				// Wei-min Lee 03/05/09 - Paths for UPK
				//APPL.upkDst=APPL.psNTptHome + '\\webserv\\pshr-84920\\applications\\peoplesoft\\HRSTGUPK\\PlayerPackage';
				APPL.upkDst='D:\\' + APPL.psRootDir + '\\PT85515\\webserv\\pshr-85515\\applications\\peoplesoft\\HRSTGUPK\\PlayerPackage';
			}
		break;
		case 'PSFSCM92':
			PSFSCM92();
			APPL.support="1";  //This is needed as PS has there own variables that we do not want to over-write.
			// Wei-min Lee 03/05/09 - Paths for UPK
			APPL.upkSrc='"\\\\' + APPL.CODESERVER + '\\DOC$\\UPK_Publish\\Financials\\Publishing Content\\PlayerPackage"';
			APPL.upkEZSrc='"\\\\' + APPL.CODESERVER + '\\DOC$\\UPK_Publish\\Ezsourcing\\Publishing Content\\PlayerPackage"';
			// Wei-min Lee 03/20/09 - Paths for report manager
			APPL.psRMroot='\\\\' + APPL.CODESERVER + '\\alreport$\\FIN\\';
			APPL.psRMpath=APPL.psRMroot + APPL.psenv;
			if (APPL.env == "PRD" ) {
				APPL.psNTdrive='D';
				APPL.psASdrive='D';
				APPL.psNTptHome=APPL.psNTdrive + ':\\' + APPL.psRootDir + '\\PT85511';
				// Wei-min Lee 03/05/09 - Paths for UPK
				APPL.upkDst=APPL.psNTptHome + '\\webserv\\psfin-pt85511\\applications\\peoplesoft\\FINPRDUPK\\PlayerPackage';
				// Wei-min Lee 03/17/09 - PIA service name
				APPL.psPIAservice='psfin-pt85511-PIA';
				APPL.upkEZDst='c$\\PSOFT\\PT85511\\webserv\\ps-85511\\applications\\peoplesoft\\SSPRDUPK\\PlayerPackage';
			} else {
				//Tru Yang 09/29/09 added to fix different Home Drives/Paths.  If UAT, DMO, or FIX then home Drive is D:
				if (APPL.env == "UAT" || APPL.env == "DMO" || APPL.env == "FIX") {
					APPL.psNTdrive='D';
					APPL.psASdrive='D';
				} else if (APPL.env == "SYT" || APPL.env == "DEV" || APPL.env == "USR" || APPL.env == "TRN") {
					//Tru Yang 09/29/09 added to fix different Home Drives/Paths.  If DEV, SYT, USR, or TRN then home Drive is E:
					// Wei-min Lee 05/26/09 - New updates have relocated PS_HOME
					APPL.psNTdrive='D';
					APPL.psASdrive='D';
				}
				APPL.psNTptHome=APPL.psNTdrive + ':\\' + APPL.psRootDir + '\\PT85511';
				// Wei-min Lee 03/05/09 - Paths for UPK
				APPL.upkDst='D:\\' + APPL.psRootDir + '\\PT85511\\webserv\\psfin-85511\\applications\\peoplesoft\\FINSTGUPK\\PlayerPackage';
				// Wei-min Lee 03/17/09 - PIA service name
				APPL.psPIAservice='psfin-85511-PIA';
				APPL.upkEZDst='d$\\PSOFT\\PT85511\\webserv\\ps-85511\\applications\\peoplesoft\\SSSTGUPK\\PlayerPackage';
			}
		break;
		case 'SAMPLE':
			SYSTEM();
		break;
		case 'TRAINING':
			SYSTEM();
		break;
		case 'TAXAUD':
			SYSTEM();
		break;
		case 'PRISM':
			SYSTEM();
		break;
		case 'OPR':
			SYSTEM();
		break;
		case 'ROV':
			SYSTEM();
		break;
		case 'BDM':
			SYSTEM();
		break;
		case 'PWA':
			SYSTEM();
		break;
		case 'APPROB':
			SYSTEM();
		break;
		case 'PJPROB':
			SYSTEM();
		break;
		case 'CIS':
			SYSTEM();
		break;
		case 'VRU':
			SYSTEM();
		break;
		case 'CCWEBPAY':
			SYSTEM();
		break;
		case 'LEAWS':
			LEAWS();
		break;
		case 'JAIL':
			SYSTEM();
		break;
		case 'PUBDEF':
			SYSTEM();
		break;
		case 'LPR':
			SYSTEM();
		break;
		case 'BUDGET':
			SYSTEM();
		break;
		case 'RESPECT':
			SYSTEM();
		break;
		case 'TXAAWDCORR':
			SYSTEM();
		break;
		case 'TXAREFUND':
			SYSTEM();
		break;
		case 'TXCCHK21':
			SYSTEM();
		break;
		case 'TXCDATA':
			SYSTEM();
		break;
		case 'TXCACH':
			SYSTEM();
		break;
		case 'TXCTTDBILL':
			SYSTEM();
		break;
		case 'SMART':
			SYSTEM();
		break;
		case 'FRAUDCOMNET':
			SYSTEM();
		break;
		case 'IMPROVE':
			SYSTEM();
		break;
		case 'TXAWARRECON':
			SYSTEM();
		break;
		case 'CASHISSUE':
			SYSTEM();
		break;
		case 'CORPUS':
			SYSTEM();
		break;
		case 'CCEDD':
			SYSTEM();
		break;
		case 'CASP':
			SYSTEM();
		break;
		case 'VERIMOVE':
			SYSTEM();
		break;
		case 'SSAPRINTING':
			SYSTEM();
		break;
		case 'SPPMT':
			SYSTEM();
		break;
		case 'ECCHANGE':
			SYSTEM();
		break;
		case 'CDA':
			SYSTEM();
		break;
		case 'KOFAX':
			SYSTEM();
		break;
		case 'FILENET':
			SYSTEM();
		break;
		case 'GSA':
			SYSTEM();
		break;
		case 'PREQ':
			SYSTEM();
		break;
		case 'BCW':
			SYSTEM();
		break;
		case 'GEOSOL':
			SYSTEM();
		break;
		case 'OCR':
			SYSTEM();
		break;
		case 'DSERIES':
			SYSTEM();
		break;
		default :
			//This is the default variables for the Middleware Services Team
			APPL.support="1";  //To verify if the app is a Middleware support app or Middleware specific app.
			if (APPL.env == "PRD") {
			} else {
			}

			APPL.AGENTUSER='MWSVCSGP_CyberBatch';

			POST();
		break;
	}

	if (APPL.support == "0") {
		//Support Directories
		APPL.supportWindir='C:\\WINDOWS';
		APPL.supportItdPrtSrv='US001PS02V';
		APPL.supportMfPrtSrv='US01PPS005';
		APPL.supportCodeServer='\\\\US01PFS022\\cyber_batch$';
		APPL.supportBatchUtilDir=APPL.supportCodeServer + '\\BATCH_UTILITIES\\' + APPL.env;//Why is this APPL?  Is appl to allow declaration at APPL lvl
		APPL.supportCodeDir=APPL.supportCodeServer + '\\' + APPL.sysID + '\\' + APPL.env;
		APPL.supportFtpVBS=APPL.supportBatchUtilDir + '\\cybermation_ftp.vbs';
		APPL.supportFtpVBSNOFILE=APPL.supportBatchUtilDir + '\\cybermation_ftp_nofile.vbs';
		APPL.supportCodeFtpDir=APPL.supportFtpVBS + ' ' + APPL.supportCodeDir + '\\FTP';
		APPL.supportCodeFtpDirNoFile=APPL.supportFtpVBSNOFILE + ' ' + APPL.supportCodeDir + '\\FTP';
		APPL.supportCodeExeDir='/C ' + APPL.supportCodeDir + '\\EXE';
		APPL.supportCodePwrShDir=APPL.supportCodeDir + '\\PWRSH';
		APPL.supportCodeJavaDir=APPL.supportCodeDir + '\\JAVA';
		APPL.supportCodeScriptDir=APPL.supportCodeDir + '\\SCRIPT';
		APPL.supportDataDir=APPL.supportCodeDir + '\\DATA';
		APPL.supportCodeSSRSDir=APPL.supportCodeDir + '\\SSRS';
		APPL.supportReportDir=APPL.supportCodeDir + '\\REPORTS';
		APPL.supportBatchDir=APPL.sysID + '\\' + APPL.env;
		APPL.supportBatchTmpRoot=APPL.batchShare + '\\' + APPL.supportBatchDir;
		APPL.supportSqlOutputDir='-o ' + APPL.supportBatchTmpRoot;

		// Archive Dirs
		APPL.supportArchShare='\\\\US01PFS022\\batcharch$';
		APPL.supportArchRoot=APPL.supportArchShare + '\\' + APPL.supportBatchDir;
		APPL.supportArchDataDir=APPL.supportArchRoot + '\\DATA';
		APPL.supportArchReportDir=APPL.supportArchRoot + '\\REPORTS';
	}

	APPL.xCopy=APPL.windir + '\\system32\\xcopy.exe';
	APPL.xCopyArgs='/D /E /I /F /H /R /Y';
	APPL.psNTpsHome=APPL.psNTdrive + ':\\' + APPL.psRootDir + '\\' + APPL.psenv;
	APPL.psNTservice='PeopleSoft  ' + APPL.psNTpsHome;
	APPL.psAppSrvSvc='PeopleSoft_' + APPL.psASdrive + '__' + APPL.psRootDir + '_' + APPL.psenv;
	APPL.psPubSubSvc='PeopleSoft_' + APPL.psASdrive + '__' + APPL.psRootDir + '_' + APPL.psType + 'XD' + APPL.env + 'PS';
	APPL.psNTCacheDir=APPL.psNTdrive + '$\\' + APPL.psRootDir + '\\' + APPL.psenv + '\\appserv\\prcs\\' + APPL.psenv + '\\CACHE';
	APPL.psASCacheBUDir=APPL.psNTdrive + '$\\' + APPL.psRootDir + '\\' + APPL.psenv + '\\appserv\\prcs\\' + APPL.psenv + '\\BUCACHE';
	APPL.psASCacheStageDir=APPL.psNTdrive + '$\\' + APPL.psRootDir + '\\' + APPL.psenv + '\\appserv\\prcs\\' + APPL.psenv + '\\CACHE\\CACHE\\stage\\stage';
	APPL.psASCacheDir=APPL.psASdrive + '$\\' + APPL.psRootDir + '\\' + APPL.psenv + '\\appserv\\' + APPL.psenv + '\\CACHE';
	APPL.psAppSharedCache=APPL.psASCacheDir + '\\SHARE';
	APPL.psNTenvHome=APPL.psNTdrive + ':\\' + APPL.psRootDir + '\\' + APPL.psenv;

	//Paths for app server tracesql and rmtcbl out files
	APPL.psASLogDir=APPL.psASdrive + '$\\' + APPL.psRootDir + '\\' + APPL.psenv + '\\appserv\\' + APPL.psenv + '\\LOGS';
	if (APPL.env == "PRD") {//Checks if Prod or Not Prod
	} else {
	}
	APPL.sysoutDir=APPL.BATCHSERVER + '\\sysout$';
	if (APPL.sysID == "PSFSCM92" ) {
		if (APPL.env == "PRD") {//Checks if Prod or Not Prod
			APPL.sysoutDir=APPL.BATCHSERVER + '\\sysout$';
		} else {
			APPL.sysoutDir=APPL.BATCHSERVER + '\\sysoutdev$';
		}
	}
	if (APPL.sysID == "PSHRMS92" ) {
		APPL.sysoutDir=APPL.BATCHSERVER + '\\hrsysout$';
	}
	APPL.onlTrcDir=APPL.sysoutDir + '\\ONLTRC\\' + APPL.psenv;
	APPL.rmtCallDir=APPL.sysoutDir + '\\RMTCALL\\' + APPL.psenv;
	//Datamover
	APPL.psNTcltBinPth='\\bin\\client\\winx86';
	APPL.psNTcltBin=APPL.psNTptHome + APPL.psNTcltBinPth;
	APPL.psDataMover=APPL.psNTcltBin + '\\psdmtx.exe';
	//PSADMIN
	APPL.psNTpsAdmPth=APPL.psNTpsHome + '\\appserv';
	//VBS Cleanup Apps
	APPL.delArchives=APPL.codeScriptDir + '\\delete_archive_general.vbs';
	APPL.delLogs=APPL.codeScriptDir + '\\delete_logs_general.vbs';
	APPL.delSpools=APPL.codeScriptDir + '\\delete_spools_general.vbs';
	//This is the global variables for the Middleware Services Team
	if (APPL.env == "PRD") {//Checks if Prod or Not Prod
		APPL.emailMiddlewareTeam='ITDCybermationAdmins@acgov.org';
	} else {
		APPL.emailMiddlewareTeam='ITDCybermationAdmins@acgov.org';
	}
}
//===========================================================
//This function is the overall class for DBAGROUP.
function DBAGROUP(){
	APPL.appName=APPL._name.split('_');
	APPL.sysID=APPL.appName[1];
	APPL.ver=APPL.sysID.substring(6,8);
	APPL.AGENTUSER='dbabatch';
	APPL.CMDSTRJAVA='C:\\Program Files (x86)\\Java\\jre7\\bin\\java.exe';
	APPL.cmdStrCLI='C:\\Program Files\\CA\\Workload Automation\\bin\\cli';
	genTime('HD','today less 7 days');
	APPL.HousekeepDate=HDYEAR+'-'+HDMM+'-'+HDDD+' '+HDHH+':'+HDMN+':'+HDSS;
	APPL.codeIMDir=APPL.codeDir + '\\IM';
	//This is the PRE variables for the DBA Team
	if (APPL.env == "PRD") {
		this.emailDBATeam='alldba@acgov.org';
		this.emailDBANotify='alldba@acgov.org, opsday@co.alameda.ca.us, opsgrave@co.alameda.ca.us, opsswing@acgov.org, psadmins@co.alameda.ca.us';
		this.emailDBA='alldba@acgov.org';
	} else {
		this.emailDBATeam='alldba@acgov.org';
		this.emailDBANotify='alldba@acgov.org';
		this.emailDBA='Thomas.York@acgov.org';
	}
	if (APPL.sysID == "DBMAINT") {
		this.appStr=APPL._name.split('_');
		this.mySysID=this.appStr.shift();
		this.myCue=this.appStr.shift();
		this.dbSrvType=this.appStr.shift();
		APPL.DBSERVER=this.appStr.shift();
		APPL.dbInst=this.appStr.join('_');
		if (APPL.dbInst == "") {
			APPL.dbConnStr='jdbc:sqlserver://' + APPL.DBSERVER + ':1433;DatabaseName=';
		} else {
			APPL.dbConnStr='jdbc:sqlserver://' + APPL.DBSERVER + '\\' + APPL.dbInst + ':1433;DatabaseName=';
		}
		POST();
	} else {
		USER();
	}
	//This is the POST variables for the DBA Team
	if (APPL.env == "PRD") {
	} else {
	}
}
//===========================================================
//This function is the overall class for TECHSVCS.
function TECHSVCS(){
	APPL.appName=APPL._name.split('_');
	APPL.sysID=APPL.appName[1];
	APPL.ver=APPL.sysID.substring(6,8);
	if (APPL.env == "PRD") {
		APPL.DBSERVER='US001DB08VP';
		APPL.emailTSTeam='Rich.Zink@acgov.org, Kevin.Omara@acgov.org, Doug.Evans@acgov.org';
		APPL.MOBIUSServer='US001AP029';
		APPL.VSAMDB='166.107.229.1';
		APPL.fromMFIn='\\\\' + APPL.MOBIUSServer + '\\FTP_Root\\FromMF\\fxprd';
		APPL.fromNT='\\\\' + APPL.MOBIUSServer + '\\FTP_Root\\FromNT\\fxprd';
		APPL.replArchExe='/C "\\\\' + APPL.MOBIUSServer + '\\C$\\Program Files\\Mobius\\VDRNET\\ReplArch.exe" -DSN ' + APPL.DBSERVER +
			' -DSU MobiAdmin -DSP Mobi -U Admin -R * -M A -PD 30 -H ' + APPL.VSAMDB +
			' -HU MOBIADMN -HP MOBIADMN -DF E2.TY4.VD63.TOPICP -TID * -TEMP \\\\' + APPL.MOBIUSServer + '\\MOBIUS\\REPLARCH -LOG ' +
			'\\\\' + APPL.MOBIUSServer + '\\MOBIUS\\REPLARCH\\ A';

	} else {
		APPL.DBSERVER='ADMIN';
		APPL.emailTSTeam='Rich.Zink@acgov.org, Paul.Ng@acgov.org';
		APPL.MOBIUSServer='US01TAP081';
		APPL.VSAMDB='166.107.228.1';
		APPL.fromNT='\\\\' + APPL.MOBIUSServer + '\\FTP_Root\\FromNT\\';
		APPL.fromMFIn='\\\\' + APPL.MOBIUSServer + '\\FTP_Root\\FromMF\\';
		APPL.replArchExe='/C "\\\\' + APPL.MOBIUSServer + '\\C$\\Program Files (x86)\\Mobius\\VDRNET\\ReplArch.exe" -DSN ' + APPL.DBSERVER +
			' -DSU MobiAdmin -DSP Mobi -U Admin -R * -M A -PD 30 -H ' + APPL.VSAMDB +
			' -HU MOBIADMN -HP MOBIADMN -DF E2.TY4.VD63.TOPIC1 -TID * -TEMP \\\\' + APPL.MOBIUSServer + '\\MOBIUS\\REPLARCH -LOG ' +
			'\\\\' + APPL.MOBIUSServer + '\\MOBIUS\\REPLARCH\\ A';
		APPL.JCLLIB='sys1.e-procs';

	}
	APPL.acreateExe='/C "\\\\' + APPL.MOBIUSServer + '\\C$\\Program Files (x86)\\Mobius\\VDRNET\\acreate.exe" -S ' + APPL.DBSERVER + ' -U admin -F';
	APPL.createLSTFilesExe='/C \\\\' + APPL.MOBIUSServer + '\\MOBIUS\\Utilities\\CreateLSTFiles.EXE';
	APPL.acreateDelArgs='-M i -I -O DELETE ';
	APPL.acreateSingleDelArgs='-I -O SINGLEID DELETE -D I ';
	// =================== APPL.fromMFOut='\\\\' + APPL.MOBIUSServer + '\\FTP_Root\\FromMF\\Sweep';
	APPL.fromMFOut='\\\\' + APPL.MOBIUSServer + '\\FTP_Root\\Sweep';
	APPL.unMatchedPages='\\\\' + APPL.MOBIUSServer + '\\MOBIUS\\UnmatchedPages';
	APPL.unMatchedPagesArch='\\\\' + APPL.MOBIUSServer + '\\MOBIUS\\UnmatchedPagesArchive';
	APPL.mobiusLogs='\\\\' + APPL.MOBIUSServer + '\\MOBIUS\\Logs';
	APPL.mobiusLogsArch='\\\\' + APPL.MOBIUSServer + '\\MOBIUS\\Log_Archive';
	APPL.dataArchive='\\\\' + APPL.MOBIUSServer + '\\MOBIUS\\DataArchive';
	APPL.getFileSize='/C \\\\' + APPL.MOBIUSServer + '\\Mobius\\Utilities\\GetFileSize.exe';
	APPL.toMF='\\\\' + APPL.MOBIUSServer + '\\FTP_Root\\toMF';
	APPL.archiveFolderName=APPL._SYEAR + APPL._SMM + APPL._SDD + APPL._SHH + APPL._SMN + APPL._SSS;
	APPL.DirDelete='\\\\' + APPL.MOBIUSServer + '\\E$\\MOBIUS\\Utilities\\DirDelete.Bat';
	POST();
	APPL.AGENTUSER='TECHSVCS_CyUsr';
	APPL.ZOSAGENT='ESPZOSP';

}
//===========================================================
function USER(){
	switch (APPL.sysID) {
		case 'MWSVCSGP':
			MWSVCSGP();
		break;
		case 'PSFSCM92':
			PSFSCM92();
		break;
		case 'PSHRMS92':
			PSHRMS92();
		break;
		case 'DBAGROUP':
			DBAGROUP();
		break;
		case 'TECHSVCS':
			TECHSVCS();
		break;
		case 'SRVRSVCS':
			SRVRSVCS();
		break;
		case 'LEAWS':
			LEAWS();
		break;
		default :
			SYSTEM();
		break;
	}
}
//===========================================================
function LEAWS(){
	if (APPL.env == "PRD") {
		loadContext(APPL,'APP_TRIGGER_LEAWS_PRDPRE');
	} else {
		loadContext(APPL,'APP_TRIGGER_LEAWS_NONPRDPRE');
	}
	APPL.genTime('LMNT', 'Today less 1 Month');
	APPL.genTime('MNDT', 'Monday of this week');
	loadContext(APPL,'APP_TRIGGER_LEAWS_ALL');
	POST();
}
//===========================================================
//This function is the overall class for SYSTEM.
function SYSTEM(){
	//This is the PRE variables for SYSTEM
	if (APPL.env == "PRD") {
		loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_PRDPRE');
	} else {
		loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_NONPRDPRE');
		switch (APPL.env) {
			case 'DEV':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_DEVPRE');
			break;
			case 'SYT':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_SYTPRE');
			break;
			case 'UAT':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_UATPRE');
			break;
			case 'USR':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_USRPRE');
			break;
			case 'TRN':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_TRNPRE');
			break;
		}
	}
	loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_ALL');
	POST();
	if (APPL.env == "PRD") {
		loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_PRDPST');
	} else {
		loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_NONPRDPST');
		switch (APPL.env) {
			case 'DEV':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_DEVPST');
			break;
			case 'SYT':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_SYTPST');
			break;
			case 'UAT':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_UATPST');
			break;
			case 'USR':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_USRPST');
			break;
			case 'TRN':
				loadContext(APPL,'APP_TRIGGER_' + APPL.sysID + '_TRNPST');
			break;
		}
	}
}
//===========================================================
//End of Script

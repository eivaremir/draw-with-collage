import PhotoAlbum from "react-photo-album";
import { useState, useEffect } from 'react';


import { db } from "./db";
import { ref, onValue } from 'firebase/database';

import Cell from './Row'

function Test() {

    const [pictures, setPictures] = useState([
        []
    ]);
    const readPicture = () => {
        var roomId = 1
        const dbRef = ref(db, '/rooms/id' + roomId + '/pictures');

        onValue(dbRef, (snapshot) => {

            const data = snapshot.val();
            console.log("data", data);
            if (data) setPictures(Object.values(data))
        });
    }

    const createTable = (arr) => {
        var arr2 = []
        for (let i = 0; i < arr.length; i++) { //a.length
            arr2[i] = Cell(arr[i], arr.length)
        }

        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100vw"
            }}>
                {(arr2)}
            </div>
        );
    };

    const widHei = () => {
        let wiHe
        do { wiHe = Math.round(Math.random() * 1000, 0) } while ((wiHe < 10) || (wiHe > 500))
        console.log("wiHe:", wiHe)
        return (wiHe)
    }



    const photos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(() => {
        const s = widHei()
        return {
            src: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22500%22%20height=%22500%22%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20d='M%206.816569676106796%2091.65087852197354%20Q%206.816569676106796%2091.65087852197354%2011.3032802406559%2092.27048181673022%2015.789990805205003%2092.89008511148691%2025.13894067480378%2094.03721514195888%2034.48789054440256%2095.18434517243087%2042.986274857479174%2095.83694925831406%2051.48465917055579%2096.48955334419725%2060.07669550445625%2096.51321847054504%2068.6687318383567%2096.53688359689284%2075.10828590314352%2090.88477421497586%2081.54783996793033%2085.23266483305889%2085.83956273638188%2078.17388295009638%2090.13128550483341%2071.11510106713388%2094.60483124625678%2061.61902440619152%2099.07837698768014%2052.122947745249164%20102.0228335862334%2044.22880230503108%20104.96729018478666%2036.33465686481299%20105.42867778919553%2028.223689229815513%20105.8900653936044%2020.112721594818037%20103.78970273703845%2013.621591271951665%20101.68934008047252%207.130460949085292%20101.32937009430012%205.494770863080535%20100.96940010812772%203.859080777075778%20101.15056898067928%202.1940767866848843%20101.33173785323086%200.529072796293991%20102.03507715572633%20-0.990918741170745%20102.73841645822178%20-2.510910278635481%20103.89028638002631%20-3.726745847962703%20105.04215630183083%20-4.942581417289925%20106.52195575806735%20-5.726962713421654%20108.00175521430387%20-6.511344009553382%20109.65454881127532%20-6.7821461037280715%20111.30734240824677%20-7.052948197902761%20112.96008222005509%20-6.781818039375509%20114.6128220318634%20-6.510687880848258%20116.09246576393133%20-5.726012868788283%20117.57210949599926%20-4.941337856728308%20118.72373805899124%20-3.7252736720323725%20119.87536662198325%20-2.5092094873364372%20120.57840420135365%20-0.9890783711519737%20121.28144178072405%200.5310527450324898%20121.46228015632887%202.1960926635653206%20121.6431185319337%203.8611325820981515%20121.28282387811042%205.496751183981113%20120.92252922428715%207.132369785864075%20120.05882448639963%208.56731737171864%20119.1951197485121%2010.002264957573209%20117.91843504061305%2011.086302136371032%20116.64175033271401%2012.170339315168857%20115.08575488073251%2012.789967108131782%20113.529759428751%2013.409594901094707%20111.85736636725244%2013.499938114733663%20110.18497330575386%2013.590281328372619%20108.57128262974598%2013.141881004371315%20106.95759195373812%2012.693480680370012%20105.57155750297196%2011.753284451017578%20104.1855230522058%2010.813088221665144%20103.1722629995541%209.479534880362475%20102.15900294690242%208.145981539059807%20101.62460588735253%206.558694472665192%20101.09020882780264%204.971407406270577%20101.09062627455654%203.296575989638619%20101.09104372131043%201.62174457300666%20101.62623196758278%200.03472409757128658%20102.16142021385512%20-1.5522963778640868%20103.17534490898524%20-2.885344449392081%20104.18926960411535%20-4.218392520920075%20105.57577256487299%20-5.157897703561188%20106.96227552563063%20-6.097402886202301%20108.57618952602323%20-6.544998739328726%20110.19010352641583%20-6.992594592455151%20111.86245134457035%20-6.901417712090724%20113.53479916272487%20-6.810240831726296%20115.0904855406236%20-6.189837461313529%20116.64617191852234%20-5.569434090900763%20117.92231608173796%20-4.484760627092458%20119.19846024495358%20-3.4000871632841525%20120.06144956272807%20-1.9647092040670247%20120.92443888050256%20-0.5293312448498968%20120.92386439608372%20-0.5307738772707049%20120.92328991166487%20-0.532216509691513%20122.15870124171806%203.8915040018776375%20123.39411257177127%208.315224513446788%20124.35949292756877%2016.163855015949782%20125.32487328336627%2024.012485518452774%20123.58228040685523%2031.798449404452377%20121.83968753034421%2039.58441329045198%20118.45219622092029%2046.62152828862048%20115.06470491149636%2053.65864328678898%20110.84188757394413%2062.107794258323594%20106.6190702363919%2070.55694522985821%20102.66910711337118%2078.47156062807876%2098.71914399035046%2086.38617602629931%2093.46918930800847%2094.06044268195686%2088.21923462566647%20101.7347093376144%2078.6845208928525%20106.40193027472881%2069.14980716003853%20111.0691512118432%2059.8368744177913%20110.31709794448601%2050.523941675544066%20109.56504467712881%2041.9755312113227%20108.9478531264487%2033.42712074710134%20108.33066157576862%2023.81856497094817%20107.7202889950803%2014.210009194794997%20107.10991641439199%209.6967197593441%20106.72951894620923%205.183430323893204%20106.34912147802646%204.315887702185158%20106.14462665000116%203.448345080477112%20105.94013182197584%202.654953610674897%20105.53395660016355%201.8615621408726826%20105.12778137835127%201.1884337724785423%20104.54353268572783%200.5153054040844021%20103.95928399310438%200.001562389496205352%20103.23091839113583%20-0.5121806250919914%20102.50255278916728%20-0.8366795177282675%20101.67240292086217%20-1.1611784103645437%20100.84225305255704%20-1.2775732901623633%2099.95856726726566%20-1.393968169960183%2099.0748814819743%20-1.2954941610369057%2098.18901963905762%20-1.1970201521136286%2097.30315779614092%20-0.8894005684946591%2096.46660622753129%20-0.5817809848756896%2095.63005465892164%20-0.08289469121440618%2094.89143378109182%200.4159916024468773%2094.15281290326202%201.077149311322811%2093.55505139633547%201.7383070201987447%2092.95728988940891%202.5233096271850948%2092.5351296802539%203.308312234171445%2092.11296947109889%204.171535350866978%2091.89094653090662%205.0347584675625106%2091.66892359071434%205.926031525866515%2091.65994190320049%206.817304584170519%2091.65096021568662%206.816937130138657%2091.65091936883007%20Z'%3E%3C/path%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20d='M%2087.5934639471943%20109%20Q%2087.5934639471943%20109%2087.64779765413454%20111.85%2087.70213136107479%20114.7%2087.73054790382417%20123.92006504048885%2087.75896444657354%20133.1401300809777%2087.64231250791882%20141.4434032399225%2087.52566056926409%20149.7466763988673%2087.19376517246981%20157.39122871467978%2086.86186977567553%20165.03578103049227%2095.05124534457556%20166.82790603658373%20103.2406209134756%20168.6200310426752%20110.72807131787837%20169.80891869279745%20118.21552172228114%20170.9978063429197%20121.17728258728721%20162.2707498982594%20124.13904345229327%20153.5436934535991%20126.39051960238571%20145.50180358750845%20128.64199575247815%20137.45991372141776%20129.94328608927444%20128.9684506644362%20131.24457642607072%20120.47698760745463%20123.47855523494921%20117.02568933399888%20115.7125340438277%20113.57439106054314%20108.14900132084588%20111.76354783790057%20100.58546859786406%20109.95270461525803%2092.78864183577795%20109.28667834336379%2084.99181507369182%20108.62065207146955%2080.12802547142199%20108.52319411064698%2075.26423586915216%20108.42573614982442%2073.55599222258212%20107.84138047273572%2071.84774857601207%20107.25702479564703%2070.41552310025338%20106.15779865877593%2068.98329762449471%20105.05857252190485%2067.97704470493014%20103.5595651919493%2066.97079178536555%20102.06055786199374%2066.49586636829846%20100.31871580209958%2066.02094095123138%2098.57687374220541%2066.12706785319685%2096.77456827584518%2066.2331947551623%2094.97226280948496%2066.90926246150974%2093.29819579474905%2067.5853301678572%2091.62412878001314%2068.7605542112675%2090.25357547525515%2069.93577825467781%2088.88302217049716%2071.48711236757691%2087.9594798685162%2073.03844648047601%2087.03593756653524%2074.80346557173092%2086.65610139014021%2076.56848466298582%2086.27626521374516%2078.36239076782238%2086.47990411087162%2080.15629687265893%2086.68354300799808%2081.7912675483555%2087.44933593236145%2083.42623822405207%2088.21512885672482%2084.73109160927291%2089.46289708699454%2086.03594499449373%2090.71066531726427%2086.87406259535835%2092.3097671903523%2087.71218019622297%2093.90886906344033%2087.9958108786793%2095.69187819111245%2088.27944156113563%2097.47488731878457%2087.97888911785925%2099.2551221747048%2087.67833667458288%20101.03535703062502%2086.825069025723%20102.62642655544215%2085.9718013768631%20104.21749608025928%2084.65515587049609%20105.4528148747234%2083.33851036412908%20106.68813366918752%2081.69634013233225%20107.43836352942574%2080.05416990053543%20108.18859338966396%2078.25841060006874%20108.37518505126789%2076.46265129960206%20108.56177671287182%2074.7013194032588%20108.16519397961612%2072.93998750691554%20107.76861124636042%2071.39749492918932%20106.83037643510463%2069.85500235146309%20105.89214162384883%2068.69284847242031%20104.51048816700137%2067.53069459337755%20103.12883471015391%2066.87055723093283%20101.4484220893678%2066.21041986848813%2099.76800946858168%2066.1214155787488%2097.96477732883906%2066.03241128900946%2096.16154518909646%2066.52385884460605%2094.42429241143546%2067.01530640020265%2092.68703963377446%2068.03575111233465%2091.19765704260638%2069.05619582446664%2089.70827445143831%2070.49879686240259%2088.62270079721726%2071.94139790033853%2087.53712714299621%2073.65511455459684%2086.96902227388276%2075.36883120885514%2086.4009174047693%2077.17423689335772%2086.40976205052473%2078.97964257786028%2086.41860669628016%2078.9779920431389%2086.41832804077492%2078.97634150841752%2086.41804938526968%2082.32734480332473%2086.47958647846478%2085.67834809823195%2086.54112357165988%2093.4077377996451%2087.23593425183645%20101.13712750105825%2087.93074493201303%20109.41337189262234%2089.7377021043273%20117.68961628418644%2091.54465927664157%20125.10846749747998%2093.90110469239512%20132.52731871077353%2096.25755010814868%20140.00738121979447%20100.64353970289126%20147.48744372881544%20105.02952929763384%20150.12089421445313%20114.0829514365046%20152.75434470009085%20123.13637357537537%20151.21829556611544%20131.04565011629256%20149.68224643214006%20138.95492665720974%20147.42788768577077%20147.0745927082566%20145.17352893940145%20155.19425875930347%20142.42878858574448%20163.45509659042216%20139.6840482320875%20171.71593442154082%20134.96370217165344%20179.49316388789518%20130.2433561112194%20187.27039335424953%20121.07467414557969%20188.98229670085297%20111.90599217993997%20190.6942000474564%20102.8252220681336%20188.916146668392%2093.74445195632724%20187.13809328932757%2085.34800420173454%20184.72166348041898%2076.95155644714185%20182.3052336715104%2072.36060805585612%20173.9418138842887%2067.76965966457037%20165.578394097067%2068.85168129604332%20157.21908428305142%2069.9337029275163%20148.85977446903587%2070.32071427220966%20140.86059033978103%2070.70772561690302%20132.86140621052618%2070.83614063377348%20123.78070310526309%2070.96455565064396%20114.7%2071.01888935758421%20111.85%2071.07322306452446%20109%2071.19324271156208%20108.01158104824816%2071.3132623585997%20107.0231620964963%2071.66634575218762%20106.09219010066096%2072.01942914577556%20105.1612181048256%2072.58505506248893%20104.3418012010462%2073.1506809792023%20103.5223842972668%2073.89597521418591%20102.86214703449116%2074.6412694491695%20102.20190977171552%2075.52291546646859%20101.73922517067729%2076.40456148376768%20101.27654056963905%2077.37131797543286%20101.0382998810897%2078.33807446709804%20100.80005919254035%2079.3337535004109%20100.80010897649206%2080.32943253372375%20100.80015876044376%2081.29616519648633%20101.03849612345093%2082.26289785924892%20101.27683348645807%2083.14449760367975%20101.73960624978447%2084.02609734811057%20102.20237901311087%2084.77132555564154%20102.8626908020087%2085.5165537631725%20103.52300259090651%2086.08209773536748%20104.3424760531804%2086.64764170756249%20105.16194951545428%2087.00063200218557%20106.09295681497409%2087.35362229680867%20107.0239641144939%2087.47354310135117%20108.01239506326831%2087.59346390589369%20109.00082601204275%2087.59346392654399%20109.00041300602138%20Z'%3E%3C/path%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20d='M%20134.4517499493351%20199.06647443002618%20Q%20134.4517499493351%20199.06647443002618%20134.55565815280033%20202.91848268778364%20134.65956635626557%20206.77049094554107%20134.09421482556124%20216.6420387259518%20133.5288632948569%20226.51358650636251%20131.64316047119564%20238.84607657843816%20129.75745764753435%20251.17856665051383%20127.78205278251792%20263.3410647393963%20125.8066479175015%20275.5035628282788%20124.31110375005734%20286.45329304284326%20122.81555958261319%20297.4030232574077%20121.85470135214621%20306.6121991093996%20120.89384312167924%20315.8213749613915%20119.40471107940483%20325.38985755536623%20117.91557903713043%20334.9583401493409%20115.0281699793511%20345.19778211090625%20112.14076092157177%20355.4372240724715%20108.89544771393443%20365.18615492242003%20105.65013450629709%20374.93508577236855%20103.43649129717153%20382.54416991517496%20101.22284808804596%20390.1532540579813%20106.20644433075358%20398.19138662135333%20111.1900405734612%20406.22951918472535%20120.01530974146424%20408.41727294756606%20128.84057890946727%20410.60502671040683%20139.38098225869135%20413.1195652511682%20149.92138560791545%20415.6341037919295%20161.97915749302837%20418.7497377394411%20174.03692937814125%20421.86537168695276%20186.4461217988977%20424.42654815931235%20198.85531421965413%20426.987724631672%20209.50096967599404%20428.40790806143605%20220.14662513233392%20429.82809149120004%20228.25681590360742%20430.52868505502215%20236.3670066748809%20431.22927861884426%20245.29562167632207%20431.80797194799106%20254.22423667776323%20432.3866652771378%20262.721231737886%20432.7798233798692%20271.21822679800874%20433.17298148260056%20278.9506062585399%20433.28960681696446%20286.68298571907104%20433.40623215132837%20290.8490344990205%20424.8041074491615%20295.01508327897%20416.2019827469947%20295.97740847469447%20407.6641699470259%20296.93973367041895%20399.1263571470571%20297.92478972261415%20389.03347953806457%20298.9098457748093%20378.94060192907205%20299.7571061673629%20368.3522570161648%20300.6043665599165%20357.7639121032575%20301.6268665581491%20347.2771582300715%20302.6493665563818%20336.7904043568855%20304.04227165460634%20326.04499685065514%20305.43517675283096%20315.29958934442476%20306.86367532083904%20304.87441219317725%20308.2921738888471%20294.4492350419298%20309.5623748935936%20284.20854928885257%20310.83257589834005%20273.96786353577534%20311.73090275070695%20264.0420936983778%20312.62922960307384%20254.1163238609803%20313.27714043386413%20245.4639964867509%20313.92505126465437%20236.81166911252149%20314.478195266562%20227.0583948474361%20315.03133926846965%20217.30512058235072%20309.2853897219471%20209.73143590048682%20303.53944017542455%20202.1577512186229%20295.45006089433593%20200.41669246177378%20287.36068161324727%20198.67563370492465%20279.55784129706075%20197.47671321522523%20271.75500098087423%20196.2777927255258%20260.9811033871007%20195.14851929990746%20250.2072057933271%20194.0192458742891%20241.25080361730275%20192.9915324540077%20232.2944014412784%20191.9638190337263%20224.11770371482683%20190.66029715328392%20215.94100598837525%20189.3567752728415%20207.2137373073756%20187.69296032247928%20198.4864686263759%20186.02914537211703%20187.33902921186282%20185.11383603775298%20176.19158979734974%20184.19852670338892%20166.28126639248973%20184.44513076064692%20156.3709429876297%20184.6917348179049%20152.16788188826183%20185.15916062267476%20147.96482078889397%20185.62658642744464%20146.60639044195256%20185.51179325653894%20145.24796009501114%20185.39700008563324%20143.99729851649775%20184.85445414692535%20142.74663693798436%20184.31190820821746%20141.734688725312%20183.39841420470833%20140.72274051263963%20182.48492020119917%20140.05545691080343%20181.29612119619517%20139.38817330896723%20180.10732219119117%20139.13541908722522%20178.7676857543287%20138.8826648654832%20177.42804931746625%20139.07090345757243%20176.07783573731447%20139.25914204966165%20174.7276221571627%20139.8686648253002%20173.5081991519853%20140.4781876009387%20172.2887761468079%20141.4451773646188%20171.32781762714333%20142.41216712829888%20170.36685910747877%20143.63537979650272%20169.76497768400435%20144.8585924647066%20169.16309626052993%20146.2099573481765%20168.98330907716468%20147.56132223164636%20168.80352189379946%20148.89935107035728%20169.06465271610094%20150.23737990906824%20169.32578353840242%20151.42198073040186%20170.00049190034383%20152.6065815517355%20170.67520026228524%20153.51372633699395%20171.69284402026557%20154.42087112225244%20172.71048777824592%20154.9555815729562%20173.9645193621728%20155.49029202365995%20175.2185509460997%20155.59658381447048%20176.5776729181038%20155.702875605281%20177.93679489010788%20155.36961995764213%20179.25870682094697%20155.03636431000325%20180.58061875178606%20154.29845317819368%20181.72691611335048%20153.5605420463841%20182.8732134749149%20152.49523492069397%20183.72387863085572%20151.42992779500386%20184.5745437867965%20150.14876261270666%20185.04051187073293%20148.86759743040946%20185.50647995466932%20147.50471252428648%20185.53896398520953%20146.1418276181635%20185.57144801574978%20144.83991739765247%20185.16704690632133%20143.53800717714148%20184.7626457968929%20142.43338198600088%20183.96370045040447%20141.32875679486025%20183.164755103916%20140.53707118219518%20182.054915309046%20139.7453855695301%20180.94507551417598%20139.34952922797135%20179.64054179041653%20138.95367288641256%20178.3360080666571%20138.9950920794172%20176.97336543924928%20139.03651127242182%20175.6107228118415%20139.51086939954865%20174.33264032357766%20139.98522752667552%20173.05455783531383%20140.84285916679605%20171.99485106009618%20141.70049080691658%20170.93514428487853%20142.85160170091734%20170.2047648018078%20144.00271259491814%20169.47438531873706%20145.32678112833355%20169.1498040524922%20146.650849661749%20168.8252227862473%20146.64958955946645%20168.8253213340826%20146.64832945718393%20168.82541988191787%20151.2585161708064%20168.72912884021991%20155.86870288442884%20168.63283779852196%20166.02267334571212%20168.5044069319843%20176.17664380699543%20168.37597606544668%20185.348841529504%20168.286933744674%20194.5210392520126%20168.19789142390132%20204.04606802601023%20169.92540706481418%20213.57109680000784%20171.65292270572704%20221.70184279597333%20173.45714732397767%20229.83258879193886%20175.26137194222832%20237.68967048357985%20176.79953753668377%20245.54675217522083%20178.33770313113925%20255.66663287040518%20179.6250813585753%20265.78651356558953%20180.91245958601138%20273.65944564852896%20181.9022746981825%20281.53237773146844%20182.89208981035364%20290.13348283197774%20184.13481091830675%20298.73458793248705%20185.37753202625987%20307.4851202088537%20187.37985362925508%20316.23565248522027%20189.38217523225026%20322.35175507321753%20194.27692190198536%20328.4678576612148%20199.1716685717205%20328.0380150641537%20208.90368386172582%20327.6081724670926%20218.6356991517312%20326.0583292022924%20228.26969014879603%20324.5084859374922%20237.90368114586084%20323.4368785659427%20246.4683137043006%20322.3652711943933%20255.03294626274038%20321.39575574072666%20265.01991951310947%20320.42624028706%20275.0068927634785%20319.24960495370857%20285.3582407609392%20318.0729696203571%20295.70958875839995%20316.86223693875417%20306.062313625563%20315.6515042571512%20316.41503849272607%20314.78941378254683%20327.08540810297006%20313.9273233079425%20337.75577771321406%20313.4827049963692%20348.0244303955262%20313.0380866847959%20358.2930830778384%20313.15577515235054%20368.8471679052535%20313.27346361990516%20379.4012527326686%20313.5255565973829%20389.69235669954395%20313.77764957486056%20399.9834606664193%20313.72549300627014%20408.9044458953334%20313.6733364376797%20417.8254311242476%20312.3677633059586%20427.43278452304355%20311.06219017423746%20437.0401379218395%20304.59273126391577%20443.664353895933%20298.123272353594%20450.28856987002655%20289.9900558229348%20449.84803044814635%20281.8568392922756%20449.4074910262661%20273.64236864835016%20448.12485467207455%20265.4278980044247%20446.84221831788307%20256.40016164442704%20444.92706400764826%20247.3724252844293%20443.0119096974135%20237.53245472577638%20440.9704528235749%20227.69248416712344%20438.9289959497363%20218.3582903468045%20437.2908161459214%20209.02409652648558%20435.65263634210646%20197.2309455945437%20433.9311324142524%20185.43779466260185%20432.2096284863983%20172.4830657498822%20430.42135545303717%20159.52833683716256%20428.63308241967604%20148.1782028003885%20426.810208512705%20136.82806876361445%20424.9873346057339%20126.42420676598584%20423.3813080610098%20116.02034476835722%20421.77528151628565%20107.012564442052%20419.0772824588786%2098.00478411574677%20416.3792834014715%2092.4820719788285%20410.5628235662332%2086.95935984191023%20404.7463637309949%2089.01604182651025%20395.7896671677668%2091.07272381111028%20386.83297060453873%2093.89853593919563%20379.3961489012173%2096.72434806728097%20371.95932719789596%2099.98347310768236%20362.316001454953%20103.24259814808374%20352.67267571201%20105.97378905836055%20342.92283519206455%20108.70497996863735%20333.17299467211916%20110.48034372331158%20323.87742385361014%20112.25570747798581%20314.5818530351012%20113.84086450818387%20305.4670735082161%20115.42602153838192%20296.3522939813311%20117.0599099408799%20285.4072819689006%20118.69379834337789%20274.46226995647004%20120.06709330078354%20262.3206268714935%20121.4403882581892%20250.17898378651697%20122.16187819669298%20237.96594974252474%20122.88336813519678%20225.75291569853255%20123.34527186114528%20216.19121390237467%20123.80717558709378%20206.62951210621677%20124.01108684231684%20202.78151883809528%20124.2149980975399%20198.93352556997382%20124.2973225942959%20198.32201856283115%20124.37964709105191%20197.71051155568847%20124.60592700883797%20197.13647711303065%20124.83220692662402%20196.56244267037283%20125.18929086598669%20196.05924370097807%20125.54637480534937%20195.55604473158328%20126.01350903095539%20195.15292718319546%20126.4806432565614%20194.74980963480766%20127.03067790527032%20194.4702027182795%20127.58071255397924%20194.19059580175136%20128.18167958616485%20194.05075028420873%20128.78264661835044%20193.91090476666614%20129.3996178018658%20193.91894847615927%20130.01658898538113%20193.9269921856524%20130.61370592605203%20194.08245762140763%20131.2108228667229%20194.23792305716282%20131.75338109990216%20194.53177456074945%20132.2959393330814%20194.82562606433612%20132.75240534876463%20195.24078497255925%20133.20887136444787%20195.65594388078236%20133.5527153363566%20196.16828113838983%20133.89655930826535%20196.68061839599733%20134.10779700859683%20197.26035693750498%20134.31903470892829%20197.8400954790126%20134.38538899261425%20198.45354087314905%20134.45174327630022%20199.06698626728553%20134.45174661281766%20199.06673034865585%20Z'%3E%3C/path%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20d='M%20321.39447766093247%20282.3276463645089%20Q%20321.39447766093247%20282.3276463645089%20324.69633041882065%20282.60743650130223%20327.99818317670884%20282.8872266380956%20335.46743968247466%20283.81076083995094%20342.9366961882405%20284.73429504180626%20352.6737667142544%20285.75135767656286%20362.41083724026834%20286.7684203113195%20371.962917367981%20288.81076044583415%20381.51499749569365%20290.8531005803488%20387.0273960900164%20298.2063001669997%20392.53979468433914%20305.55949975365064%20395.50832209781015%20313.00367950084797%20398.47684951128116%20320.4478592480453%20400.94909324265063%20327.6895674328903%20403.42133697402005%20334.93127561773537%20401.4121855234973%20345.54965357753383%20399.40303407297466%20356.16803153733235%20391.646916172092%20358.59858720839827%20383.89079827120935%20361.02914287946413%20374.3470145387163%20362.0449963334924%20364.80323080622316%20363.0608497875207%20356.23408763193663%20362.70058541615214%20347.66494445765017%20362.3403210447836%20339.71629379184463%20361.7189924934264%20331.7676431260391%20361.0976639420692%20323.90737368519746%20360.26875857890616%20316.0471042443558%20359.4398532157432%20293.3846603156675%20355.90217817900566%20270.7222163869792%20352.3645031422682%20251.17192582896274%20349.49317181070705%20231.62163527094629%20346.62184047914593%20216.47859894901737%20344.42300018098797%20201.33556262708845%20342.22415988283007%20189.69486369738814%20340.45778617886384%20178.05416476768784%20338.6914124748976%20169.25573791206423%20337.26522751165436%20160.45731105644063%20335.8390425484111%20148.73997313198166%20334.4442626319586%20137.02263520752268%20333.0494827155061%20130.7020617807562%20332.27715969565804%20124.38148835398974%20331.50483667581005%20123.9149872870998%20331.33580059209976%20123.44848622020987%20331.1667645083894%20123.03599593043735%20330.89099612033715%20122.62350564066483%20330.6152277322849%20122.28900008303208%20330.24875471156116%20121.95449452539934%20329.88228169083743%20121.71741517863265%20329.4464034666254%20121.48033583186597%20329.0105252424133%20121.35446175873855%20328.53057507758376%20121.22858768561115%20328.05062491275424%20121.22123469316733%20327.5544975334375%20121.2138817007235%20327.0583701541208%20121.3254771452296%20326.5749005069132%20121.4370725897357%20326.09143085970555%20121.66113053871373%20325.6487182232185%20121.88518848769176%20325.20600558673146%20122.2086866826198%20324.8297804401983%20122.53218487754785%20324.4535552936652%20122.93632158813718%20324.1656838602794%20123.3404582987265%20323.87781242689357%20123.8017450803694%20323.695025807889%20124.2630318620123%20323.5122391888845%20124.7546587052862%20323.44516095114597%20125.2462855485601%20323.3780827134074%20125.73967907823494%20323.4306114472639%20126.23307260790979%20323.48314018112046%20136.84861797289958%20321.95733290910164%20147.46416333788937%20320.43152563708287%20155.06329993110293%20320.71082916252635%20162.6624365243165%20320.9901326879698%20170.89246261016768%20321.25933313778415%20179.1224886960189%20321.52853358759853%20186.86944727088252%20321.65863488789154%20194.6164058457461%20321.78873618818454%20206.00107646994434%20322.175815830748%20217.38574709414254%20322.56289547331147%20225.552137644059%20322.97813306466503%20233.71852819397546%20323.39337065601853%20242.4073315961645%20323.7734255285103%20251.0961349983536%20324.153480401002%20259.95381109765185%20324.4446097817895%20268.81148719695017%20324.73573916257703%20277.12140488043974%20324.8641105616681%20285.43132256392926%20324.9924819607592%20294.8847168571276%20325.2765597073394%20304.3381111503259%20325.5606374539196%20314.60345868357706%20325.80283619502967%20324.8688062168282%20326.04503493613976%20333.7844645111627%20325.7945991935224%20342.70012280549713%20325.54416345090505%20350.54691827635577%20325.2217062145221%20358.3937137472144%20324.89924897813916%20366.1493205874898%20324.3504123805566%20373.90492742776513%20323.80157578297394%20384.4942831123308%20322.707709029217%20395.0836387968964%20321.6138422754601%20404.1996967258103%20321.3150708469203%20413.3157546547242%20321.0162994183805%20423.37009555170334%20320.6529772995026%20433.4244364486825%20320.2896551806247%20441.08374810393826%20319.6621027128148%20448.743059759194%20319.03455024500477%20455.20996590940695%20318.458732764654%20461.6768720596199%20317.8829152843032%20462.7748042362647%20318.0098778556597%20463.8727364129095%20318.1368404270162%20464.87265110723877%20318.60773867834223%20465.872565801568%20319.07863692966833%20466.6697716811335%20319.844167689745%20467.4669775606991%20320.6096984498217%20467.97800695946853%20321.58971044598843%20468.489036358238%20322.56972244215524%20468.6603843632615%20323.66160815971546%20468.83173236828503%20324.7534938772757%20468.64545879820514%20325.84293259337085%20468.45918522812525%20326.9323713094661%20467.9347929749008%20327.9052985029372%20467.4104007216764%20328.8782256964084%20466.60279379264614%20329.6327756332712%20465.7951868636158%20330.38732557013407%20464.78892191743665%20330.84449667281723%20463.7826569712575%20331.3016677755004%20462.6830902134226%20331.4135941088715%20461.5835234555877%20331.52552044224257%20460.50577981589976%20331.28048328965195%20459.42803617621183%20331.03544613706134%20458.4849556982429%20330.4591009530688%20457.541875220274%20329.88275576907625%20456.8321986790165%20329.0354460465861%20456.12252213775906%20328.188136324096%20455.72055285441905%20327.15857561472103%20455.31858357107905%20326.12901490534614%20455.26640783573185%20325.0249984871356%20455.21423210038466%20323.920982068925%20455.5173127262941%20322.85810075229756%20455.8203933522036%20321.79521943567005%20456.44699771783155%20320.8847571750499%20457.07360208345943%20319.9742949144298%20457.9581245463171%20319.31157734884266%20458.84264700917475%20318.64885978325555%20459.89247783390965%20318.3032736167588%20460.94230865864455%20317.95768745026214%20462.0475302807786%20317.96541564571396%20463.1527519029126%20317.9731438411657%20464.1976473268581%20318.33337725446216%20465.2425427508036%20318.6936106677586%20466.1177111498479%20319.3686327654352%20466.9928795488922%20320.0436548631118%20467.6066905606333%20320.9627906533533%20468.2205015723745%20321.88192644359475%20468.5086890218528%20322.9489421665345%20468.79687647133113%20324.01595788947424%20468.7292670565121%20325.11913671725574%20468.6616576416931%20326.2223155450372%20468.2453300861555%20327.2461543631807%20467.8290025306179%20328.26999318132425%20467.10754643932626%20329.107295795303%20466.38609034803466%20329.9445984092818%20465.4350423641932%20330.5076990143858%20464.4839943803517%20331.07079961948983%20463.4029294789208%20331.30074143372053%20462.3218645774899%20331.5306832479513%20462.32288816009486%20331.5306348735121%20462.3239117426998%20331.5305864990729%20455.90515167641126%20331.6103030982286%20449.4863916101227%20331.6900196973843%20441.8160529954587%20331.96978083442764%20434.14571438079463%20332.24954197147093%20424.0829043125004%20333.1420172295526%20414.0200942442061%20334.0344924876342%20405.06396309211607%20334.72643836994075%20396.10783194002596%20335.4183842522473%20385.4592510162626%20335.99726076328193%20374.81067009249927%20336.5761372743166%20366.7036857416781%20336.8991452257984%20358.5967013908569%20337.2221531772803%20350.7720945927347%20337.1790616518849%20342.94748779461247%20337.13597012648955%20333.97886010523905%20337.27219972779955%20325.0102324158656%20337.40842932910954%20314.612196307293%20337.69445764780613%20304.21416019872044%20337.9804859665027%20294.71477858871333%20338.04840876734954%20285.2153969787063%20338.11633156819636%20276.87096073109944%20337.9455265718087%20268.52652448349266%20337.77472157542104%20259.6134655415081%20337.65176597976733%20250.70040659952355%20337.5288103841137%20241.9002985127101%20337.3357372615311%20233.1001904258966%20337.1426641389485%20224.80441974535978%20336.7646449897147%20216.50864906482295%20336.3866258404809%20205.37061771325136%20335.72496872376234%20194.2325863616798%20335.0633116070437%20186.44015609953954%20334.7168952406737%20178.6477258373993%20334.37047887430367%20170.33188502082305%20333.98013930105503%20162.01604420424678%20333.5897997278064%20151.433880175222%20332.66714085921956%20140.85171614619722%20331.74448199063266%20132.61680279713397%20331.62470560277325%20124.38188944807072%20331.5049292149139%20123.91537147990495%20331.3359397821554%20123.44885351173917%20331.1669503493968%20123.03633564719036%20330.8912232117523%20122.62381778264152%20330.6154960741078%20122.2892755793793%20330.24905650577216%20121.95473337611706%20329.88261693743647%20121.71761044271344%20329.44676242333844%20121.4804875093098%20329.0109079092404%20121.35456544179534%20328.53097033421795%20121.22864337428089%20328.0510327591955%20121.22124076913599%20327.5549061176586%20121.2138381639911%20327.05877947612174%20121.32538526097457%20326.5752986717871%20121.43693235795806%20326.0918178674524%20121.66094603455223%20325.649082827384%20121.8849597111464%20325.2063477873156%20122.20842028194235%20324.8300902928442%20122.53188085273831%20324.4538327983728%20122.93598877416366%20324.1659209527553%20123.34009669558903%20323.87800910713787%20123.80136519626362%20323.69517636036915%20124.2626336969382%20323.5123436136005%20124.7542538299302%20323.4452162135131%20125.24587396292222%20323.37808881342573%20125.73927274300347%20323.43056820766674%20126.23267152308472%20323.4830476019077%20132.00103467158547%20325.65206196514066%20137.76939782008623%20327.8210763283736%20149.37024886562438%20329.5381126672322%20160.97109991116253%20331.2551490060909%20169.82811749178884%20331.807861502505%20178.68513507241516%20332.36057399891905%20190.4037861286063%20332.92231495337325%20202.12243718479743%20333.48405590782744%20217.40216375700092%20334.02417403134064%20232.6818903292044%20334.5642921548538%20252.45249729369664%20335.15056076158675%20272.22310425818887%20335.7368293683197%20302.6843636125536%20337.3434881994208%20333.1456229669183%20338.95014703052186%20341.4559999745009%20340.0197659725917%20349.7663769820835%20341.0893849146616%20358.694834773794%20341.48016869849187%20367.6232925655045%20341.8709524823221%20375.2718710400931%20338.10096588323336%20382.9204495146817%20334.3309792841447%20380.2164805711442%20326.0048584387174%20377.5125116276067%20317.67873759329007%20371.4333181641945%20310.6784497317153%20365.3541247007822%20303.67816187014057%20356.80550224353715%20302.5182900562937%20348.256879786292%20301.35841824244693%20337.3960353165104%20300.1689393080351%20326.5351908467287%20298.97946037362317%20323.2370436046169%20298.65925051041654%20319.93889636250503%20298.33904064720986%20318.9914969080734%20298.1356292045174%20318.0440974536417%20297.9322177618249%20317.1729105133787%20297.5079828547383%20316.3017235731157%20297.08374794765166%20315.55738257292194%20296.46334612890337%20314.8130415727282%20295.842944310155%20314.23880764650767%20295.06243336260013%20313.6645737202872%20294.28192241504524%20313.2938213708121%20293.38666567162784%20312.9230690213371%20292.49140892821043%20312.7773463925787%20291.53343875292137%20312.63162376382024%20290.5754685776323%20312.7194002618087%20289.6104622420694%20312.80717675979713%20288.6454559065065%20313.1233508103452%20287.7294996242333%20313.4395248608932%20286.81354334196016%20313.96572041332763%20285.9998725351385%20314.491915965762%20285.18620172831675%20315.19755050985214%20284.52210698246915%20315.9031850539422%20283.85801223662156%20316.7472470768314%20283.38209076957907%20317.59130909972055%20282.90616930253657%20318.5247416769804%20282.64608169232474%20319.45817425424025%20282.385994082113%20320.4267262406233%20282.35685663285756%20321.3952782270063%20282.3277191836022%20321.3948779439694%20282.3276827740556%20Z'%3E%3C/path%3E%3C/svg%3E",
            width: s, height: s
        }
    })


    useEffect(() => {
        readPicture()
        console.log(pictures)
    }, [])

    return <PhotoAlbum layout="columns" photos={photos} />;
}

export default Test
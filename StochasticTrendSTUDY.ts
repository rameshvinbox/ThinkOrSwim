# STOCHASTICTREND
# DREWGRIFFITH15 (C) 2014

DECLARE UPPER;

DEF PAINTBARS = YES;
INPUT KPERIOD = 14;
INPUT DPERIOD = 3;
INPUT SMA = 10;
INPUT OVER_BOUGHT = 85;
INPUT OVER_SOLD = 15;

DEF FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
DEF STOCHASTIC_SMA = SIMPLEMOVINGAVG(FASTLINE,SMA);

# TEST
DEF GREENPRICE = FASTLINE > STOCHASTIC_SMA AND FASTLINE > OVER_SOLD;
DEF REDPRICE = FASTLINE < STOCHASTIC_SMA AND FASTLINE < OVER_BOUGHT;

PLOT BULLISH = GREENPRICE;
PLOT NEUTRAL = !GREENPRICE AND !REDPRICE;
PLOT BEARISH = REDPRICE;

PLOT RATING =
IF GREENPRICE THEN 1
ELSE IF REDPRICE THEN -1
ELSE 0;

BULLISH.SETDEFAULTCOLOR(COLOR.UPTICK);
BULLISH.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_POINTS);
BULLISH.SETLINEWEIGHT(3);
BULLISH.HIDE();
NEUTRAL.SETDEFAULTCOLOR(COLOR.GRAY);
NEUTRAL.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_POINTS);
NEUTRAL.SETLINEWEIGHT(3);
NEUTRAL.HIDE();
BEARISH.SETDEFAULTCOLOR(COLOR.DOWNTICK);
BEARISH.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_POINTS);
BEARISH.SETLINEWEIGHT(3);
BEARISH.HIDE();
RATING.Hide();
RATING.HideBubble();

DEFINEGLOBALCOLOR("BULLISH", COLOR.UPTICK);
DEFINEGLOBALCOLOR("NEUTRAL", COLOR.GRAY);
DEFINEGLOBALCOLOR("BEARISH", COLOR.DOWNTICK);
ASSIGNPRICECOLOR(IF !PAINTBARS THEN COLOR.CURRENT ELSE IF GREENPRICE THEN GLOBALCOLOR("BULLISH") ELSE IF REDPRICE THEN GLOBALCOLOR("BEARISH") ELSE GLOBALCOLOR("NEUTRAL"));

# SWINGTRIGGER
# DREWGRIFFITH15 (C) 2014

DECLARE UPPER;

INPUT KPERIOD = 14;
INPUT DPERIOD = 3;
INPUT SMA = 10;
INPUT MOVEMENT = 15;
INPUT OVER_BOUGHT = 85;
INPUT OVER_SOLD = 15;

# STOCHASTICSLOW
DEF FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
DEF SLOWLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;
DEF STOCHASTIC_SMA = SIMPLEMOVINGAVG(FASTLINE,SMA);

DEF LONG =
CLOSE >= HIGH[1]
AND (FASTLINE-FASTLINE[1]) >= MOVEMENT
AND FASTLINE > STOCHASTIC_SMA
AND FASTLINE < OVER_BOUGHT
AND FASTLINE > OVER_SOLD;

DEF SHORT =
CLOSE <= LOW[1]
AND (FASTLINE-FASTLINE[1]) <= -MOVEMENT
AND FASTLINE < STOCHASTIC_SMA
AND FASTLINE > OVER_SOLD
AND FASTLINE < OVER_BOUGHT;

PLOT BULL = LONG;

PLOT BEAR = SHORT;

PLOT RATING =
IF LONG AND (FASTLINE-FASTLINE[1]) >= MOVEMENT THEN (FASTLINE-FASTLINE[1])
ELSE IF SHORT AND (FASTLINE-FASTLINE[1]) <= -MOVEMENT THEN (FASTLINE-FASTLINE[1])
#ELSE IF LONG THEN FASTLINE-FASTLINE[1]
#ELSE IF SHORT THEN FASTLINE-FASTLINE[1]
ELSE 0;

PLOT BUY_ZONE = MOVEMENT;
BUY_ZONE.SETDEFAULTCOLOR(COLOR.DARK_GRAY);

PLOT SELL_ZONE = -MOVEMENT;
SELL_ZONE.SETDEFAULTCOLOR(COLOR.DARK_GRAY);

BULL.SETDEFAULTCOLOR(CREATECOLOR(0, 255, 0));
BULL.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_UP);
BEAR.SETDEFAULTCOLOR(CREATECOLOR(255, 0, 0));
BEAR.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_DOWN);
RATING.Hide();
RATING.HideBubble();
BUY_ZONE.Hide();
BUY_ZONE.HideBubble();
SELL_ZONE.Hide();
SELL_ZONE.HideBubble();

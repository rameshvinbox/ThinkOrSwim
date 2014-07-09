# SWINGTRADERLX
# WGRIFFITH2 (C) 2014

# ONLY USED ON LONG POSITIONS

INPUT SHARES = 100;
INPUT KPERIOD = 14;
INPUT DPERIOD = 3;
INPUT MACD_FAST = 5;
INPUT MACD_SLOW = 35;
INPUT MACD_LEN = 5;
INPUT SIDE = {default LONG, SHORT};
INPUT TRAIL = 3;
INPUT TARGET = 20;

# STOCHASTICSLOW
DEF FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
DEF SLOWLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

# MACD
DEF MACD = MACDHISTOGRAM("FAST LENGTH" = MACD_FAST, "SLOW LENGTH" = MACD_SLOW, "MACD LENGTH" = MACD_LEN);
# TEST
DEF GREENPRICE = FASTLINE >= SLOWLINE AND MACD >= 0.00;
DEF REDPRICE = FASTLINE < SLOWLINE AND MACD < 0.00;

PLOT ENTRY =
!REDPRICE
AND CLOSE > HIGHEST(DATA = HIGH, LENGTH = 2)[1]
AND FASTLINE <= 50;

def VOL = volumeAvg() > VolumeAvg().VolAvg;

def LMT;
switch (SIDE) {
case LONG:
    LMT = HIGH >= HIGHEST(DATA = HIGH, LENGTH = TARGET)[1] AND !VOL;
case SHORT:
    LMT = LOW <= LOWEST(DATA = LOW, LENGTH = TARGET)[1] AND !VOL;
}

def STOP;
switch (SIDE) {
case LONG:
    STOP = CLOSE < LOWEST(DATA = LOW, LENGTH = TRAIL)[1];
case SHORT:
    STOP = CLOSE > HIGHEST(DATA = HIGH, LENGTH = TRAIL)[1];
}

plot EXIT = STOP OR LMT;

#DEF SHARES = ROUND(10000 / CLOSE);
DEF FOOBAR = SHARES;

#LONG POSITION:
ADDORDER(ORDERTYPE.BUY_TO_OPEN, ENTRY IS TRUE, TRADESIZE = FOOBAR, TICKCOLOR = GETCOLOR(0), ARROWCOLOR = GETCOLOR(0), NAME = "LE");
ADDORDER(ORDERTYPE.SELL_TO_CLOSE, EXIT IS TRUE, TRADESIZE = FOOBAR, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "LX", price = HIGH);

##################################################
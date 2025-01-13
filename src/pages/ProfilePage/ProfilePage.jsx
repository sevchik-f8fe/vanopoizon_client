import { useEffect } from "react";
import { Box, Switch, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton } from "@mui/material";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { nanoid } from "nanoid";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useNotifications } from "./store";
import shapka from "../../assets/shapka_png.png";
import poizonLogo from "../../assets/miniman.png"
import BlocksContainer from "../../components/BlocksContainer/BlocksContainer";
import { useUserData } from "../../utils/store";
import { useOrders } from "../OrdersPage/store";
import { copyOnCLickHandle, shortTitle } from "../../utils/utilFuncs";

const ProfilePage = () => {
    const navigate = useNavigate()

    let tg = window.Telegram.WebApp;
    let user_photo = tg?.initDataUnsafe?.user?.photo_url || poizonLogo;
    let user_firstName = tg?.initDataUnsafe?.user?.first_name || 'Личный';
    let user_secondName = tg?.initDataUnsafe?.user?.last_name || '';

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    minWidth: '100%',
                    minHeight: '12em',
                    backgroundImage: `url(${shapka})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 0',
                    boxShadow: '0px -86px 46px 16px rgba(32, 32, 41, 1) inset',
                }}
            >
            </Box>

            <Box
                sx={{
                    zIndex: '100',
                    w: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: '2em .5em',
                    gap: '.5em',
                }}
            >
                <Grid container spacing={1} sx={{ zIndex: 100 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        {isSmallScreen ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '.5em',
                                    flexDirection: 'column',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        minWidth: '3em',
                                        minHeight: '3em'
                                    }}
                                    src={user_photo}
                                />
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        fontSize: '1.8em',
                                        zIndex: '100',
                                        fontWeight: '900',
                                    }}
                                >
                                    {user_firstName} {user_secondName}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '1em'
                                    }}
                                >
                                    <IconButton
                                        onClick={() => navigate('/favorite')}
                                    >
                                        <FavoriteIcon
                                            sx={{ color: '#F34213' }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => navigate('/cart')}
                                    >
                                        <ShoppingCartIcon
                                            sx={{ color: '#F34213' }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        zIndex: '100',
                                        mb: '.5em',
                                        display: 'flex',
                                        p: '.5em',
                                        borderRadius: '.5em',
                                        alignItems: 'center',
                                        gap: '.5em',
                                        backgroundColor: '#2E2E3A',
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            minWidth: '3em',
                                            minHeight: '3em'
                                        }}
                                        src={user_photo}
                                    />
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontSize: '1.5em',
                                            zIndex: '100',
                                            fontWeight: '900',
                                        }}
                                    >
                                        {user_firstName} {user_secondName}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: '1em'
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => navigate('/favorite')}
                                        >
                                            <FavoriteIcon
                                                sx={{ color: '#F34213' }}
                                            />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => navigate('/cart')}
                                        >
                                            <ShoppingCartIcon
                                                sx={{ color: '#F34213' }}
                                            />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <OrdersContainer />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <BlocksContainer />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <StatusContainer />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <NotificationsContainer />
                        <Box sx={{ mt: '.5em' }}></Box>
                        <DataContainer />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

const OrdersContainer = () => {
    const navigate = useNavigate();
    const { orders } = useOrders();

    return (
        <Box
            sx={{
                zIndex: '100',
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '.5em',
                    overflowX: 'auto',
                }}
            >
                {orders
                    .filter(elem => elem.status !== 'done')
                    .map(elem => <OrderElement key={nanoid()} orderId={elem.orderId} address={elem.address} status={elem.status} products={elem.products} label={elem.label} />)}

                <Box
                    onClick={() => navigate('/orders')}
                    sx={{
                        backgroundColor: '#202029',
                        borderRadius: '.5em',
                        p: '.5em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            p: '.5em',
                            backgroundColor: '#fff1',
                            display: 'flex',
                            gap: '.2em',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            whiteSpace: 'nowrap',
                            height: '96%',
                            borderRadius: '.5em'
                        }}
                    >
                        <ArrowOutwardIcon
                            sx={{
                                color: '#fff',
                                fontSize: '1.4em'
                            }}
                        />
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '.75em',
                                fontWeight: 600
                            }}
                        >Все заказы</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const OrderElement = ({ orderId, status, address, products, label }) => {
    const navigate = useNavigate();
    const statusColors = {
        'atView': '#ffffff',
        'onWay': '#709ed9',
        'readyForDone': '#19DB40',
        'done': '#686A69',
    }

    return (
        <Box
            onClick={() => navigate('/orders')}
            sx={{
                backgroundColor: '#202029',
                borderRadius: '.5em',
                maxWidth: '75%',
                p: '.5em',
                display: 'flex',
                alignItems: 'center',
                gap: '.5em'
            }}
        >
            <Box
                sx={{
                    borderRadius: '.5em',
                    backgroundImage: `url(${products[0].photoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '4em',
                    maxHeight: '4em',
                    minWidth: '4em',
                    maxWidth: '4em',
                }}
            ></Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: '.2em',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    sx={{
                        color: statusColors[status],
                        fontSize: '.8em',
                        fontWeight: '900',
                    }}
                >{label}</Typography>

                <Box
                    sx={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '.8em',
                            pr: '.5em',
                            fontWeight: 500,
                        }}
                    >{shortTitle(address)}</Typography>
                </Box>

                <Box
                    onClick={(e) => {
                        e.stopPropagation();
                        copyOnCLickHandle(orderId);
                    }}
                    sx={{
                        p: '.2em .4em',
                        borderRadius: '.5em',
                        backgroundColor: `${statusColors[status]}10`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1em',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography
                        sx={{
                            color: `${statusColors[status]}70`,
                            fontSize: '.8em',
                            fontWeight: '600',
                        }}
                    >#{orderId}</Typography>

                    <ContentCopyIcon
                        sx={{
                            color: `${statusColors[status]}70`,
                            fontSize: '1em'
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

const NotificationsContainer = () => {
    const { notificationsActive, setNotificationsActive } = useNotifications()

    return (
        <Box
            sx={{
                zIndex: '100',
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '.5em',
                minWidth: '100%',
            }}
        >
            <Typography
                sx={{
                    color: '#fff',
                    fontSize: '1.4em',
                    fontWeight: '900',
                    mb: '.5em',
                }}
            >
                Уведомления
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1em',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '.5em',
                        alignItems: 'center'
                    }}
                >
                    <LoyaltyIcon
                        sx={{
                            color: '#F34213',
                            fontSize: '2em',
                        }}
                    />

                    <Box>
                        <Typography
                            sx={{
                                fontSize: '.9em',
                                color: '#fff',
                                fontWeight: '500',
                            }}
                        >Акции</Typography>
                        <Typography
                            sx={{
                                fontSize: '.75em',
                                color: '#ffffff50',
                                fontWeight: '500',
                            }}
                        >Розыгрыши и бонусы</Typography>
                    </Box>
                </Box>

                <Switch
                    color="warning"
                    checked={notificationsActive}
                    onChange={(e) => setNotificationsActive(e.target.checked)}
                />
            </Box>
        </Box>
    );
}

const StatusContainer = () => {
    const rows = [
        { status: 'Новичок', points: '+50', orders: '0' },
        { status: 'Модник', points: '+150', orders: '3' },
        { status: 'Профи', points: '+250', orders: '10' },
        { status: 'Шопоголик', points: '+350', orders: '20' },
        { status: 'Всвеволод', points: '+500', orders: '30' },
    ];

    return (
        <Box
            sx={{
                zIndex: '100',
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '.5em',
                minWidth: '100%',
            }}
        >
            <Box>
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.4em',
                        fontWeight: '900',
                        mb: '.5em',
                    }}
                >
                    Статус: <span style={{ color: '#F34213' }}>Новичок</span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >
                    Ты получаешь <span style={{ color: '#F34213' }}>+50 баллов</span> за каждый заказ
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    backgroundColor: '#202029',
                    p: '.5em',
                    borderRadius: '.5em',
                    minWidth: '90%',
                    m: '1em 0',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >У тебя нет завершенных заказов в IVAN IVANOW SHOP</Typography>
                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >Закажи и получи еще 3 товара, чтобы получить статус "Модник".</Typography>
            </Box>

            <TableContainer
                component={Box}
                size='small'
            >
                <Table
                    sx={{
                        minWidth: '100%'
                    }}
                    aria-label="status table"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                'td,th': { border: 0 }
                            }}
                        >
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                }}
                            >Статус</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >Баллов за заказ</TableCell>
                            <TableCell
                                sx={{
                                    p: '.5em',
                                    fontSize: '.9em',
                                    color: '#ffffff50',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                }}
                            >Заказов</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={nanoid()}
                                sx={{
                                    'td,th': { border: 0 }
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#ffffff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}
                                >
                                    {row.status}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontSize: '.9em',
                                        p: '.5em',
                                        color: '#F34213',
                                        fontWeight: '500',
                                    }}
                                >{row.points}</TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '.9em',
                                        color: '#fff',
                                        p: '.5em',
                                        fontWeight: '500',
                                    }}

                                    align="right"
                                >{row.orders}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const DataContainer = () => {
    const navigate = useNavigate();
    const { user } = useUserData();

    const rows = [
        { title: 'Город', data: (user?.delivery?.city?.name?.length > 0) ? (user?.delivery?.city?.name) : ('Не указано') },
        { title: 'ФИО', data: (user?.delivery?.fullName?.length > 0) ? (user?.delivery?.fullName) : ('Не указано') },
        { title: 'Телефон', data: (user?.delivery?.phone?.length > 0) ? (user?.delivery?.phone) : ('Не указано') },
        { title: 'Адрес CDEK', data: (user?.delivery?.pvz?.smallAddress?.length > 0) ? (user?.delivery?.pvz?.fullAddress) : ('Не указано') },
        { title: 'Ваш адрес', data: (user?.delivery?.fullAddress?.length > 0) ? (user?.delivery?.fullAddress) : ('Не указано') },
    ];

    return (
        <Box
            sx={{
                zIndex: '100',
                backgroundColor: '#2E2E3A',
                p: '.5em',
                borderRadius: '.5em',
                minWidth: '100%',
            }}
        >
            <Box
                sx={{
                    mb: '1em'
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.4em',
                        fontWeight: '900',
                        mb: '.5em',
                    }}
                >
                    Данные доставки
                </Typography>

                <Typography
                    sx={{
                        fontSize: '.9em',
                        color: '#fff',
                        fontWeight: '500',
                    }}
                >
                    Чтобы не вводить каждый раз после заказа. Но если что-то нужно будет заказать в другое место - не проблема.
                </Typography>
            </Box>

            <TableContainer
                component={Box}
            >
                <Table
                    sx={{
                        minWidth: '100%'
                    }}
                >
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                sx={{
                                    'td,th': { border: 0 }
                                }}
                                key={nanoid()}
                            >
                                <TableCell
                                    sx={{
                                        p: '.5em',
                                        fontSize: '.75em',
                                        color: '#ffffff',
                                        textAlign: 'left',
                                        fontWeight: '600',
                                    }}
                                >{row.title}</TableCell>
                                <TableCell
                                    sx={{
                                        p: '.5em',
                                        fontSize: '.75em',
                                        color: '#ffffff50',
                                        textAlign: 'right',
                                        fontWeight: '500',
                                    }}
                                >{row.data}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                onClick={() => navigate('/deliveryData')}
                sx={{
                    mt: '1em',
                    minWidth: '100%'
                }}
                variant="outlined"
                size="large"
            >
                Редактировать
            </Button>
        </Box>
    );
}

export default ProfilePage;
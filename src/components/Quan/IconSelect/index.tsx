import React, { useState } from 'react';
import { Rule } from "rc-field-form/lib/interface";
import type { TabsProps } from 'antd';
import { Alert, Button, Form, List, Modal, Popover, Segmented, Space, Tabs } from 'antd';
import { ProCard, ProForm, ProFormText } from "@ant-design/pro-components";
import { LabelTooltipType } from "antd/es/form/FormItemLabel";
import Icon, { IconType } from "@/components/Quan/Icon";
import Marquee from 'react-fast-marquee';
import { EyeOutlined } from "@ant-design/icons";

export type FormProps = {
  name: string;
  label?: React.ReactNode;
  placeholder?: string | string[];
  rules?: Rule[];
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  disabled?: boolean;
  /**
   * 图标弹窗设置
   */
  modal?: {
    title?: string;
    width?: string | number;
    buttonLabel?: string;
    alert?: string;
  };
  /**
   * 图标预览
   */
  preview?: boolean;
  tooltip?: LabelTooltipType;
};

// 图标分类
const iconClassify: TabsProps['items'] = [
  { key: 'directional', label: '方向性图标' },
  { key: 'suggested', label: '提示建议性图标' },
  { key: 'editor', label: '编辑类图标' },
  { key: 'data', label: '数据类图标' },
  { key: 'brand_and_logos', label: '品牌和标识' },
  { key: 'application', label: '网站通用图标' },
];
// 图标风格分类
const iconStyleClassify: Array<any> = [
  { value: 'outlined', label: '线框风格', icon: <Icon name="CheckSquareOutlined"/> },
  { value: 'filled', label: '实底风格', icon: <Icon name="CheckSquareFilled"/> },
  { value: 'twoTone', label: '双色风格', icon: <Icon name="CheckSquareTwoTone"/> }
];

// region 图标类型
// 线框风格
const outlinedDirectionalIcons: IconType[] = [
  'StepBackwardOutlined', 'StepForwardOutlined', 'FastBackwardOutlined', 'FastForwardOutlined', 'ShrinkOutlined', 'ArrowsAltOutlined',
  'DownOutlined', 'UpOutlined', 'LeftOutlined', 'RightOutlined', 'CaretUpOutlined', 'CaretDownOutlined',
  'CaretLeftOutlined', 'CaretRightOutlined', 'UpCircleOutlined', 'DownCircleOutlined', 'LeftCircleOutlined', 'RightCircleOutlined',
  'DoubleRightOutlined', 'DoubleLeftOutlined', 'VerticalLeftOutlined', 'VerticalRightOutlined', 'VerticalAlignTopOutlined', 'VerticalAlignMiddleOutlined',
  'VerticalAlignBottomOutlined', 'ForwardOutlined', 'BackwardOutlined', 'RollbackOutlined', 'EnterOutlined', 'RetweetOutlined',
  'SwapOutlined', 'SwapLeftOutlined', 'SwapRightOutlined', 'ArrowUpOutlined', 'ArrowDownOutlined', 'ArrowLeftOutlined',
  'ArrowRightOutlined', 'PlayCircleOutlined', 'UpSquareOutlined', 'DownSquareOutlined', 'LeftSquareOutlined', 'RightSquareOutlined',
  'LoginOutlined', 'LogoutOutlined', 'MenuFoldOutlined', 'MenuUnfoldOutlined', 'BorderBottomOutlined', 'BorderHorizontalOutlined',
  'BorderInnerOutlined', 'BorderOuterOutlined', 'BorderLeftOutlined', 'BorderRightOutlined', 'BorderTopOutlined', 'BorderVerticleOutlined',
  'PicCenterOutlined', 'PicLeftOutlined', 'PicRightOutlined', 'RadiusBottomleftOutlined', 'RadiusBottomrightOutlined', 'RadiusUpleftOutlined',
  'RadiusUprightOutlined', 'FullscreenOutlined', 'FullscreenExitOutlined'
];
const outlinedSuggestedIcons: IconType[] = [
  'QuestionOutlined', 'QuestionCircleOutlined', 'PlusOutlined', 'PlusCircleOutlined', 'PauseOutlined', 'PauseCircleOutlined',
  'MinusOutlined', 'MinusCircleOutlined', 'PlusSquareOutlined', 'MinusSquareOutlined', 'InfoOutlined', 'InfoCircleOutlined',
  'ExclamationOutlined', 'ExclamationCircleOutlined', 'CloseOutlined', 'CloseCircleOutlined', 'CloseSquareOutlined', 'CheckOutlined',
  'CheckCircleOutlined', 'CheckSquareOutlined', 'ClockCircleOutlined', 'WarningOutlined', 'IssuesCloseOutlined', 'StopOutlined',
];
const outlinedEditorIcons: IconType[] = [
  'EditOutlined', 'FormOutlined', 'CopyOutlined', 'ScissorOutlined', 'DeleteOutlined', 'SnippetsOutlined',
  'DiffOutlined', 'HighlightOutlined', 'AlignCenterOutlined', 'AlignLeftOutlined', 'AlignRightOutlined', 'BgColorsOutlined',
  'BoldOutlined', 'ItalicOutlined', 'UnderlineOutlined', 'StrikethroughOutlined', 'RedoOutlined', 'UndoOutlined',
  'ZoomInOutlined', 'ZoomOutOutlined', 'FontColorsOutlined', 'FontSizeOutlined', 'LineHeightOutlined', 'DashOutlined',
  'SmallDashOutlined', 'SortAscendingOutlined', 'SortDescendingOutlined', 'DragOutlined', 'OrderedListOutlined', 'UnorderedListOutlined',
  'RadiusSettingOutlined', 'ColumnWidthOutlined', 'ColumnHeightOutlined',
];
const outlinedDataIcons: IconType[] = [
  'AreaChartOutlined', 'PieChartOutlined', 'BarChartOutlined', 'DotChartOutlined', 'LineChartOutlined', 'RadarChartOutlined',
  'HeatMapOutlined', 'FallOutlined', 'RiseOutlined', 'StockOutlined', 'BoxPlotOutlined', 'FundOutlined',
  'SlidersOutlined'
];
const outlinedBrandAndLogos: IconType[] = [
  'AndroidOutlined',
  'AppleOutlined',
  'WindowsOutlined',
  'IeOutlined',
  'ChromeOutlined',
  'GithubOutlined',
  'AliwangwangOutlined',
  'DingdingOutlined',
  'WeiboSquareOutlined',
  'WeiboCircleOutlined',
  'TaobaoCircleOutlined',
  'Html5Outlined',
  'WeiboOutlined',
  'TwitterOutlined',
  'WechatOutlined',
  'WhatsAppOutlined',
  'YoutubeOutlined',
  'AlipayCircleOutlined',
  'TaobaoOutlined',
  'DingtalkOutlined',
  'SkypeOutlined',
  'QqOutlined',
  'MediumWorkmarkOutlined',
  'GitlabOutlined',
  'MediumOutlined',
  'LinkedinOutlined',
  'GooglePlusOutlined',
  'DropboxOutlined',
  'FacebookOutlined',
  'CodepenOutlined',
  'CodeSandboxOutlined',
  'AmazonOutlined',
  'GoogleOutlined',
  'CodepenCircleOutlined',
  'AlipayOutlined',
  'AntDesignOutlined',
  'AntCloudOutlined',
  'AliyunOutlined',
  'ZhihuOutlined',
  'SlackOutlined',
  'SlackSquareOutlined',
  'BehanceOutlined',
  'BehanceSquareOutlined',
  'DribbbleOutlined',
  'DribbbleSquareOutlined',
  'InstagramOutlined',
  'YuqueOutlined',
  'AlibabaOutlined',
  'YahooOutlined',
  'RedditOutlined',
  'SketchOutlined',
  'WechatWorkOutlined',
  'OpenAIOutlined',
  'DiscordOutlined',
  'XOutlined',
  'BilibiliOutlined',
  'PinterestOutlined',
  'TikTokOutlined',
  'SpotifyOutlined',
  'TwitchOutlined',
  'LinuxOutlined',
  'JavaOutlined',
  'JavaScriptOutlined',
  'PythonOutlined',
  'RubyOutlined',
  'DotNetOutlined',
  'KubernetesOutlined',
  'DockerOutlined',
  'BaiduOutlined',
  'HarmonyOSOutlined',
];
const outlinedApplicationIcons: IconType[] = [
  'AccountBookOutlined',
  'AimOutlined',
  'AlertOutlined',
  'ApartmentOutlined',
  'ApiOutlined',
  'AppstoreAddOutlined',
  'AppstoreOutlined',
  'AudioOutlined',
  'AudioMutedOutlined',
  'AuditOutlined',
  'BankOutlined',
  'BarcodeOutlined',
  'BarsOutlined',
  'BellOutlined',
  'BlockOutlined',
  'BookOutlined',
  'BorderOutlined',
  'BorderlessTableOutlined',
  'BranchesOutlined',
  'BugOutlined',
  'BuildOutlined',
  'BulbOutlined',
  'CalculatorOutlined',
  'CalendarOutlined',
  'CameraOutlined',
  'CarOutlined',
  'CarryOutOutlined',
  'CiCircleOutlined',
  'CiOutlined',
  'ClearOutlined',
  'CloudDownloadOutlined',
  'CloudOutlined',
  'CloudServerOutlined',
  'CloudSyncOutlined',
  'CloudUploadOutlined',
  'ClusterOutlined',
  'CodeOutlined',
  'CoffeeOutlined',
  'CommentOutlined',
  'CompassOutlined',
  'CompressOutlined',
  'ConsoleSqlOutlined',
  'ContactsOutlined',
  'ContainerOutlined',
  'ControlOutlined',
  'CopyrightOutlined',
  'CreditCardOutlined',
  'CrownOutlined',
  'CustomerServiceOutlined',
  'DashboardOutlined',
  'DatabaseOutlined',
  'DeleteColumnOutlined',
  'DeleteRowOutlined',
  'DeliveredProcedureOutlined',
  'DeploymentUnitOutlined',
  'DesktopOutlined',
  'DisconnectOutlined',
  'DislikeOutlined',
  'DollarOutlined',
  'DownloadOutlined',
  'EllipsisOutlined',
  'EnvironmentOutlined',
  'EuroCircleOutlined',
  'EuroOutlined',
  'ExceptionOutlined',
  'ExpandAltOutlined',
  'ExpandOutlined',
  'ExperimentOutlined',
  'ExportOutlined',
  'EyeOutlined',
  'EyeInvisibleOutlined',
  'FieldBinaryOutlined',
  'FieldNumberOutlined',
  'FieldStringOutlined',
  'FieldTimeOutlined',
  'FileAddOutlined',
  'FileDoneOutlined',
  'FileExcelOutlined',
  'FileExclamationOutlined',
  'FileOutlined',
  'FileGifOutlined',
  'FileImageOutlined',
  'FileJpgOutlined',
  'FileMarkdownOutlined',
  'FilePdfOutlined',
  'FilePptOutlined',
  'FileProtectOutlined',
  'FileSearchOutlined',
  'FileSyncOutlined',
  'FileTextOutlined',
  'FileUnknownOutlined',
  'FileWordOutlined',
  'FileZipOutlined',
  'FilterOutlined',
  'FireOutlined',
  'FlagOutlined',
  'FolderAddOutlined',
  'FolderOutlined',
  'FolderOpenOutlined',
  'FolderViewOutlined',
  'ForkOutlined',
  'FormatPainterOutlined',
  'FrownOutlined',
  'FunctionOutlined',
  'FundProjectionScreenOutlined',
  'FundViewOutlined',
  'FunnelPlotOutlined',
  'GatewayOutlined',
  'GifOutlined',
  'GiftOutlined',
  'GlobalOutlined',
  'GoldOutlined',
  'GroupOutlined',
  'HddOutlined',
  'HeartOutlined',
  'HistoryOutlined',
  'HolderOutlined',
  'HomeOutlined',
  'HourglassOutlined',
  'IdcardOutlined',
  'ImportOutlined',
  'InboxOutlined',
  'InsertRowAboveOutlined',
  'InsertRowBelowOutlined',
  'InsertRowLeftOutlined',
  'InsertRowRightOutlined',
  'InsuranceOutlined',
  'InteractionOutlined',
  'KeyOutlined',
  'LaptopOutlined',
  'LayoutOutlined',
  'LikeOutlined',
  'LineOutlined',
  'LinkOutlined',
  'Loading3QuartersOutlined',
  'LoadingOutlined',
  'LockOutlined',
  'MacCommandOutlined',
  'MailOutlined',
  'ManOutlined',
  'MedicineBoxOutlined',
  'MehOutlined',
  'MenuOutlined',
  'MergeCellsOutlined',
  'MergeOutlined',
  'MessageOutlined',
  'MobileOutlined',
  'MoneyCollectOutlined',
  'MonitorOutlined',
  'MoonOutlined',
  'MoreOutlined',
  'MutedOutlined',
  'NodeCollapseOutlined',
  'NodeExpandOutlined',
  'NodeIndexOutlined',
  'NotificationOutlined',
  'NumberOutlined',
  'OneToOneOutlined',
  'PaperClipOutlined',
  'PartitionOutlined',
  'PayCircleOutlined',
  'PercentageOutlined',
  'PhoneOutlined',
  'PictureOutlined',
  'PlaySquareOutlined',
  'PoundCircleOutlined',
  'PoundOutlined',
  'PoweroffOutlined',
  'PrinterOutlined',
  'ProductOutlined',
  'ProfileOutlined',
  'ProjectOutlined',
  'PropertySafetyOutlined',
  'PullRequestOutlined',
  'PushpinOutlined',
  'QrcodeOutlined',
  'ReadOutlined',
  'ReconciliationOutlined',
  'RedEnvelopeOutlined',
  'ReloadOutlined',
  'RestOutlined',
  'RobotOutlined',
  'RocketOutlined',
  'RotateLeftOutlined',
  'RotateRightOutlined',
  'SafetyCertificateOutlined',
  'SafetyOutlined',
  'SaveOutlined',
  'ScanOutlined',
  'ScheduleOutlined',
  'SearchOutlined',
  'SecurityScanOutlined',
  'SelectOutlined',
  'SendOutlined',
  'SettingOutlined',
  'ShakeOutlined',
  'ShareAltOutlined',
  'ShopOutlined',
  'ShoppingCartOutlined',
  'ShoppingOutlined',
  'SignatureOutlined',
  'SisternodeOutlined',
  'SkinOutlined',
  'SmileOutlined',
  'SolutionOutlined',
  'SoundOutlined',
  'SplitCellsOutlined',
  'StarOutlined',
  'SubnodeOutlined',
  'SunOutlined',
  'SwitcherOutlined',
  'SyncOutlined',
  'TableOutlined',
  'TabletOutlined',
  'TagOutlined',
  'TagsOutlined',
  'TeamOutlined',
  'ThunderboltOutlined',
  'ToTopOutlined',
  'ToolOutlined',
  'TrademarkCircleOutlined',
  'TrademarkOutlined',
  'TransactionOutlined',
  'TranslationOutlined',
  'TrophyOutlined',
  'TruckOutlined',
  'UngroupOutlined',
  'UnlockOutlined',
  'UploadOutlined',
  'UsbOutlined',
  'UserAddOutlined',
  'UserDeleteOutlined',
  'UserOutlined',
  'UserSwitchOutlined',
  'UsergroupAddOutlined',
  'UsergroupDeleteOutlined',
  'VerifiedOutlined',
  'VideoCameraAddOutlined',
  'VideoCameraOutlined',
  'WalletOutlined',
  'WifiOutlined',
  'WomanOutlined',
];
// 实底风格
const filledDirectionalIcons: IconType[] = [
  'StepBackwardFilled',
  'StepForwardFilled',
  'FastBackwardFilled',
  'FastForwardFilled',
  'CaretUpFilled',
  'CaretDownFilled',
  'CaretLeftFilled',
  'CaretRightFilled',
  'UpCircleFilled',
  'DownCircleFilled',
  'LeftCircleFilled',
  'RightCircleFilled',
  'ForwardFilled',
  'BackwardFilled',
  'PlayCircleFilled',
  'UpSquareFilled',
  'DownSquareFilled',
  'LeftSquareFilled',
  'RightSquareFilled',
];
const filledSuggestedIcons: IconType[] = [
  'QuestionCircleFilled',
  'PlusCircleFilled',
  'PauseCircleFilled',
  'MinusCircleFilled',
  'PlusSquareFilled',
  'MinusSquareFilled',
  'InfoCircleFilled',
  'ExclamationCircleFilled',
  'CloseCircleFilled',
  'CloseSquareFilled',
  'CheckCircleFilled',
  'CheckSquareFilled',
  'ClockCircleFilled',
  'WarningFilled',
  'StopFilled',
];
const filledEditorIcons: IconType[] = [
  'EditFilled',
  'CopyFilled',
  'DeleteFilled',
  'SnippetsFilled',
  'DiffFilled',
  'HighlightFilled',
];
const filledDataIcons: IconType[] = [
  'PieChartFilled',
  'BoxPlotFilled',
  'FundFilled',
  'SlidersFilled',
];
const filledBrandAndLogos: IconType[] = [
  'AndroidFilled',
  'AppleFilled',
  'WindowsFilled',
  'ChromeFilled',
  'GithubFilled',
  'AliwangwangFilled',
  'WeiboSquareFilled',
  'WeiboCircleFilled',
  'TaobaoCircleFilled',
  'Html5Filled',
  'WechatFilled',
  'YoutubeFilled',
  'AlipayCircleFilled',
  'SkypeFilled',
  'GitlabFilled',
  'LinkedinFilled',
  'FacebookFilled',
  'CodeSandboxCircleFilled',
  'CodepenCircleFilled',
  'SlackSquareFilled',
  'BehanceSquareFilled',
  'DribbbleSquareFilled',
  'InstagramFilled',
  'YuqueFilled',
  'YahooFilled',
  'WechatWorkFilled',
  'OpenAIFilled',
  'DiscordFilled',
  'XFilled',
  'BilibiliFilled',
  'PinterestFilled',
  'TikTokFilled',
  'SpotifyFilled',
  'TwitchFilled',
];
const filledApplicationIcons: IconType[] = [
  'AccountBookFilled',
  'AlertFilled',
  'AlipaySquareFilled',
  'AmazonCircleFilled',
  'AmazonSquareFilled',
  'ApiFilled',
  'AppstoreFilled',
  'AudioFilled',
  'BankFilled',
  'BehanceCircleFilled',
  'BellFilled',
  'BookFilled',
  'BugFilled',
  'BuildFilled',
  'BulbFilled',
  'CalculatorFilled',
  'CalendarFilled',
  'CameraFilled',
  'CarFilled',
  'CarryOutFilled',
  'CiCircleFilled',
  'CloudFilled',
  'CodeFilled',
  'CodeSandboxSquareFilled',
  'CodepenSquareFilled',
  'CompassFilled',
  'ContactsFilled',
  'ContainerFilled',
  'ControlFilled',
  'CreditCardFilled',
  'CrownFilled',
  'CustomerServiceFilled',
  'DashboardFilled',
  'DatabaseFilled',
  'DingtalkCircleFilled',
  'DingtalkSquareFilled',
  'DislikeFilled',
  'DribbbleCircleFilled',
  'DropboxCircleFilled',
  'DropboxSquareFilled',
  'EnvironmentFilled',
  'EuroCircleFilled',
  'ExperimentFilled',
  'EyeFilled',
  'EyeInvisibleFilled',
  'FileAddFilled',
  'FileExcelFilled',
  'FileExclamationFilled',
  'FileFilled',
  'FileImageFilled',
  'FileMarkdownFilled',
  'FilePdfFilled',
  'FilePptFilled',
  'FileTextFilled',
  'FileUnknownFilled',
  'FileWordFilled',
  'FileZipFilled',
  'FilterFilled',
  'FireFilled',
  'FlagFilled',
  'FolderAddFilled',
  'FolderFilled',
  'FolderOpenFilled',
  'FormatPainterFilled',
  'FrownFilled',
  'FunnelPlotFilled',
  'GiftFilled',
  'GoldFilled',
  'GoldenFilled',
  'GoogleCircleFilled',
  'GooglePlusCircleFilled',
  'GooglePlusSquareFilled',
  'GoogleSquareFilled',
  'HddFilled',
  'HeartFilled',
  'HomeFilled',
  'HourglassFilled',
  'IdcardFilled',
  'IeCircleFilled',
  'IeSquareFilled',
  'InsuranceFilled',
  'InteractionFilled',
  'LayoutFilled',
  'LikeFilled',
  'LockFilled',
  'MacCommandFilled',
  'MailFilled',
  'MedicineBoxFilled',
  'MediumCircleFilled',
  'MediumSquareFilled',
  'MehFilled',
  'MergeFilled',
  'MessageFilled',
  'MobileFilled',
  'MoneyCollectFilled',
  'MoonFilled',
  'MutedFilled',
  'NotificationFilled',
  'PayCircleFilled',
  'PhoneFilled',
  'PictureFilled',
  'PlaySquareFilled',
  'PoundCircleFilled',
  'PrinterFilled',
  'ProductFilled',
  'ProfileFilled',
  'ProjectFilled',
  'PropertySafetyFilled',
  'PushpinFilled',
  'QqCircleFilled',
  'QqSquareFilled',
  'ReadFilled',
  'ReconciliationFilled',
  'RedEnvelopeFilled',
  'RedditCircleFilled',
  'RedditSquareFilled',
  'RestFilled',
  'RobotFilled',
  'RocketFilled',
  'SafetyCertificateFilled',
  'SaveFilled',
  'ScheduleFilled',
  'SecurityScanFilled',
  'SettingFilled',
  'ShopFilled',
  'ShoppingFilled',
  'SignalFilled',
  'SignatureFilled',
  'SketchCircleFilled',
  'SketchSquareFilled',
  'SkinFilled',
  'SlackCircleFilled',
  'SmileFilled',
  'SoundFilled',
  'StarFilled',
  'SunFilled',
  'SwitcherFilled',
  'TabletFilled',
  'TagFilled',
  'TagsFilled',
  'TaobaoSquareFilled',
  'ThunderboltFilled',
  'ToolFilled',
  'TrademarkCircleFilled',
  'TrophyFilled',
  'TruckFilled',
  'TwitterCircleFilled',
  'TwitterSquareFilled',
  'UnlockFilled',
  'UsbFilled',
  'VideoCameraFilled',
  'WalletFilled',
  'ZhihuCircleFilled',
  'ZhihuSquareFilled',];
// 双色风格
const twoToneDirectionalIcons: IconType[] = ['UpCircleTwoTone',
  'DownCircleTwoTone',
  'LeftCircleTwoTone',
  'RightCircleTwoTone',
  'PlayCircleTwoTone',
  'UpSquareTwoTone',
  'DownSquareTwoTone',
  'LeftSquareTwoTone',
  'RightSquareTwoTone',];
const twoToneSuggestedIcons: IconType[] = ['QuestionCircleTwoTone',
  'PlusCircleTwoTone',
  'PauseCircleTwoTone',
  'MinusCircleTwoTone',
  'PlusSquareTwoTone',
  'MinusSquareTwoTone',
  'InfoCircleTwoTone',
  'ExclamationCircleTwoTone',
  'CloseCircleTwoTone',
  'CloseSquareTwoTone',
  'CheckCircleTwoTone',
  'CheckSquareTwoTone',
  'ClockCircleTwoTone',
  'WarningTwoTone',
  'StopTwoTone',];
const twoToneEditorIcons: IconType[] = ['EditTwoTone',
  'CopyTwoTone',
  'DeleteTwoTone',
  'SnippetsTwoTone',
  'DiffTwoTone',
  'HighlightTwoTone',];
const twoToneDataIcons: IconType[] = ['PieChartTwoTone',
  'BoxPlotTwoTone',
  'FundTwoTone',
  'SlidersTwoTone',];
const twoToneBrandAndLogos: IconType[] = ['Html5TwoTone',];
const twoToneApplicationIcons: IconType[] = ['AccountBookTwoTone',
  'AlertTwoTone',
  'ApiTwoTone',
  'AppstoreTwoTone',
  'AudioTwoTone',
  'BankTwoTone',
  'BellTwoTone',
  'BookTwoTone',
  'BugTwoTone',
  'BuildTwoTone',
  'BulbTwoTone',
  'CalculatorTwoTone',
  'CalendarTwoTone',
  'CameraTwoTone',
  'CarTwoTone',
  'CarryOutTwoTone',
  'CiCircleTwoTone',
  'CiTwoTone',
  'CloudTwoTone',
  'CodeTwoTone',
  'CompassTwoTone',
  'ContactsTwoTone',
  'ContainerTwoTone',
  'ControlTwoTone',
  'CopyrightTwoTone',
  'CreditCardTwoTone',
  'CrownTwoTone',
  'CustomerServiceTwoTone',
  'DashboardTwoTone',
  'DatabaseTwoTone',
  'DislikeTwoTone',
  'DollarTwoTone',
  'EnvironmentTwoTone',
  'EuroCircleTwoTone',
  'EuroTwoTone',
  'ExperimentTwoTone',
  'EyeTwoTone',
  'EyeInvisibleTwoTone',
  'FileAddTwoTone',
  'FileExcelTwoTone',
  'FileExclamationTwoTone',
  'FileTwoTone',
  'FileImageTwoTone',
  'FileMarkdownTwoTone',
  'FilePdfTwoTone',
  'FilePptTwoTone',
  'FileTextTwoTone',
  'FileUnknownTwoTone',
  'FileWordTwoTone',
  'FileZipTwoTone',
  'FilterTwoTone',
  'FireTwoTone',
  'FlagTwoTone',
  'FolderAddTwoTone',
  'FolderTwoTone',
  'FolderOpenTwoTone',
  'FrownTwoTone',
  'FunnelPlotTwoTone',
  'GiftTwoTone',
  'GoldTwoTone',
  'HddTwoTone',
  'HeartTwoTone',
  'HomeTwoTone',
  'HourglassTwoTone',
  'IdcardTwoTone',
  'InsuranceTwoTone',
  'InteractionTwoTone',
  'LayoutTwoTone',
  'LikeTwoTone',
  'LockTwoTone',
  'MailTwoTone',
  'MedicineBoxTwoTone',
  'MehTwoTone',
  'MessageTwoTone',
  'MobileTwoTone',
  'MoneyCollectTwoTone',
  'NotificationTwoTone',
  'PhoneTwoTone',
  'PictureTwoTone',
  'PlaySquareTwoTone',
  'PoundCircleTwoTone',
  'PrinterTwoTone',
  'ProfileTwoTone',
  'ProjectTwoTone',
  'PropertySafetyTwoTone',
  'PushpinTwoTone',
  'ReconciliationTwoTone',
  'RedEnvelopeTwoTone',
  'RestTwoTone',
  'RocketTwoTone',
  'SafetyCertificateTwoTone',
  'SaveTwoTone',
  'ScheduleTwoTone',
  'SecurityScanTwoTone',
  'SettingTwoTone',
  'ShopTwoTone',
  'ShoppingTwoTone',
  'SkinTwoTone',
  'SmileTwoTone',
  'SoundTwoTone',
  'StarTwoTone',
  'SwitcherTwoTone',
  'TabletTwoTone',
  'TagTwoTone',
  'TagsTwoTone',
  'ThunderboltTwoTone',
  'ToolTwoTone',
  'TrademarkCircleTwoTone',
  'TrophyTwoTone',
  'UnlockTwoTone',
  'UsbTwoTone',
  'VideoCameraTwoTone',
  'WalletTwoTone',];
// endregion ./图标类型

/**
 * 初始化图标数据与类型映射
 */
let iconNamesMapping: Map<string, IconType[]> = new Map();
iconNamesMapping.set("outlined_directional", outlinedDirectionalIcons);
iconNamesMapping.set("outlined_suggested", outlinedSuggestedIcons);
iconNamesMapping.set("outlined_editor", outlinedEditorIcons);
iconNamesMapping.set("outlined_data", outlinedDataIcons);
iconNamesMapping.set("outlined_brand_and_logos", outlinedBrandAndLogos);
iconNamesMapping.set("outlined_application", outlinedApplicationIcons);

iconNamesMapping.set("filled_directional", filledDirectionalIcons);
iconNamesMapping.set("filled_suggested", filledSuggestedIcons);
iconNamesMapping.set("filled_editor", filledEditorIcons);
iconNamesMapping.set("filled_data", filledDataIcons);
iconNamesMapping.set("filled_brand_and_logos", filledBrandAndLogos);
iconNamesMapping.set("filled_application", filledApplicationIcons);

iconNamesMapping.set("twoTone_directional", twoToneDirectionalIcons);
iconNamesMapping.set("twoTone_suggested", twoToneSuggestedIcons);
iconNamesMapping.set("twoTone_editor", twoToneEditorIcons);
iconNamesMapping.set("twoTone_data", twoToneDataIcons);
iconNamesMapping.set("twoTone_brand_and_logos", twoToneBrandAndLogos);
iconNamesMapping.set("twoTone_application", twoToneApplicationIcons);

const IconSelect: React.FC<FormProps> = ({ ...props }) => {

  const form = Form.useFormInstance();
  const iconPreview = form?.getFieldValue(props.name);

  /**
   * 点击按钮
   * 图标列表弹窗
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [icons, setIcons] = useState<TabsProps['items']>();
  const showModal = () => {
    setIsModalOpen(true);
    setIcons(iconTypeChange("outlined"));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /**
   * 图标选则
   * @param name
   */
  const iconSelected = (name: string) => {
    // 设置表单字段的值
    form?.setFieldValue(props.name, name);
  };

  const iconTypeChange = (styleClassify: string) => {
    return iconClassify.map((item) => ({
      ...item,
      children:
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 6,
          }}
          dataSource={iconNamesMapping.get(styleClassify + '_' + item.key) ?? []}
          renderItem={(iconName) => (
            <List.Item>
              <ProCard
                ghost
                hoverable
                onClick={function () {
                  iconSelected(iconName);
                  handleCancel();
                }}
              >
                <div style={{
                  textAlign: 'center',
                }}>
                  <Icon name={iconName} style={{
                    margin: '8px 0 8px',
                    fontSize: '36px',
                  }}/>
                </div>
                <div style={{
                  textAlign: 'center',
                }}>
                <span style={{
                  fontSize: '12px',
                }}>{iconName}</span>
                </div>
              </ProCard>
            </List.Item>
          )}
        />
    }));
  }

  return (
    <>
      <ProForm.Item
        label={props.label}
        tooltip={props.tooltip}
      >
        <Space direction="horizontal">
          <ProFormText
            name={props.name}
            placeholder={props.placeholder}
            rules={props.rules}
            width={props.width}
            noStyle
            disabled
            fieldProps={{
              suffix: props.preview ? (
                <Popover
                  content={
                    <ProCard
                      title={iconPreview}
                      headerBordered
                    >
                      <div style={{ textAlign: 'center', }}>
                        <Icon name={iconPreview} style={{
                          margin: '8px 0 8px',
                          fontSize: '48px',
                        }}/>
                      </div>
                    </ProCard>
                  }
                >
                  <EyeOutlined style={{
                    cursor: 'pointer',
                    color: '#1890ff',
                  }}/>
                </Popover>
              ) : null
            }}
          />
          <Button type="primary" onClick={showModal} disabled={props.disabled}>
            {props.modal?.buttonLabel}
          </Button>
        </Space>
      </ProForm.Item>
      <Modal
        title={props.modal?.title}
        width={props.modal?.width}
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {
            props.modal?.alert ? (
              <Alert
                type="success"
                closable
                message={
                  <Marquee pauseOnHover gradient={false}>
                    {props.modal?.alert}
                  </Marquee>
                }
              />
            ) : null
          }
          <Segmented
            style={{ marginBottom: 8 }}
            onChange={(value) => {
              setIcons(iconTypeChange(value));
            }}
            options={iconStyleClassify}
          />
        </Space>
        <Tabs
          items={icons}
        />
      </Modal>
    </>
  );
};

export default IconSelect;

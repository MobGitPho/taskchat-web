<script setup lang="ts">
  import initializeData from '@/dataloader'
  import { darkTheme, dateEnUS, dateFrFR, enUS, frFR } from 'naive-ui'

  import { hexToRgba } from './utils/functions'
  import Wrapper from './Wrapper.vue'

  const lang = getActiveLanguage()

  const uiStore = useUserInterfaceStore()

  const { pickByTheme } = useHelper()
  const { appPrimaryColor, appSecondaryColor, appAccentColor } = useContent()

  const themeOverrides = computed(() => {
    const settings: any = {
      common: {
        primaryColor: appPrimaryColor.value,
        fontWeightStrong: '600',
      },
      Menu: {
        itemTextColorHoverHorizontal: appSecondaryColor.value,
        itemIconColorHoverHorizontal: appSecondaryColor.value,
        itemColorActive: hexToRgba(appSecondaryColor.value, 0.1),
        itemColorHover: hexToRgba(appSecondaryColor.value, 0.1),
        itemColorActiveCollapsed: appSecondaryColor.value,
        arrowColorChildActiveHover: appAccentColor.value,
        arrowColorChildActive: appAccentColor.value,
        arrowColorActiveHover: appAccentColor.value,
        arrowColorActive: appAccentColor.value,
        arrowColorHover: appAccentColor.value,
        arrowColor: appAccentColor.value,
      },
      Button: {
        colorPrimary: appPrimaryColor.value,
        colorHoverPrimary: appSecondaryColor.value,
        colorFocusPrimary: appSecondaryColor.value,
        colorPressedPrimary: appSecondaryColor.value,
        borderHover: `1px solid ${appSecondaryColor.value}`,
        borderHoverPrimary: `1px solid ${appSecondaryColor.value}`,
        borderFocus: `1px solid ${appSecondaryColor.value}`,
        borderFocusPrimary: `1px solid ${appSecondaryColor.value}`,
        borderPressed: `1px solid ${appSecondaryColor.value}`,
        borderPressedPrimary: `1px solid ${appSecondaryColor.value}`,
        textColorPrimary: '#FFFFFF',
        textColorHoverPrimary: '#FFFFFF',
        textColorFocusPrimary: '#FFFFFF',
        textColorPressedPrimary: '#FFFFFF',
        textColorDisabledPrimary: '#FFFFFF',
        textColorHover: appPrimaryColor.value,
        textColorTextHover: appPrimaryColor.value,
        textColorTextFocus: appPrimaryColor.value,
        textColorTextPressed: appPrimaryColor.value,
      },
      Input: {
        caretColor: appPrimaryColor.value,
        loadingColor: appPrimaryColor.value,
        borderHover: `1px solid ${appPrimaryColor.value}`,
        borderFocus: `1px solid ${appPrimaryColor.value}`,
      },
      PageHeader: {
        backColorHover: appPrimaryColor.value,
        backColorPressed: appPrimaryColor.value,
      },
      Switch: {
        railColorActive: appSecondaryColor.value,
        loadingColor: appSecondaryColor.value,
      },
      Tabs: {
        colorSegment: pickByTheme('#f2f2f2', 'rgba(0, 0, 0, 1)'),
        tabTextColorActiveBar: appSecondaryColor.value,
        tabTextColorHoverBar: appSecondaryColor.value,
        barColor: appSecondaryColor.value,
      },
      Card: {
        colorEmbedded: pickByTheme('rgb(250, 250, 252)', 'rgb(44, 44, 50)'),
      },
      LoadingBar: {
        colorLoading: appSecondaryColor.value,
      },
      Spin: {
        color: appSecondaryColor.value,
      },
      BackTop: {
        iconColorHover: appSecondaryColor.value,
        iconColorPressed: appPrimaryColor.value,
      },
    }

    if (uiStore.isLightTheme) {
      settings['DataTable'] = {
        thColor: appSecondaryColor.value,
        thColorHover: appPrimaryColor.value,
        thIconColor: '#ffffff',
        thTextColor: '#ffffff',
      }
    }

    return settings
  })

  // Set theme root class
  watch(
    () => uiStore.isLightTheme,
    () => {
      document.documentElement.className = `${pickByTheme(
        'light',
        'dark'
      )}-theme`
    },
    { immediate: true }
  )

  // Initialize data
  initializeData()
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="lang == 'fr' ? frFR : enUS"
    :theme="uiStore.isLightTheme ? null : darkTheme"
    :date-locale="lang == 'fr' ? dateFrFR : dateEnUS">
    <n-modal-provider>
      <n-loading-bar-provider>
        <n-message-provider placement="bottom-right">
          <n-dialog-provider>
            <n-notification-provider :max="2" placement="bottom-right">
              <Wrapper>
                <slot></slot>
              </Wrapper>
            </n-notification-provider>
          </n-dialog-provider>
        </n-message-provider>
      </n-loading-bar-provider>
    </n-modal-provider>
  </n-config-provider>
</template>

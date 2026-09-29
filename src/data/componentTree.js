/**
 * Jerarquía real de componentes de la aplicación.
 *
 * Se mantiene en un archivo de datos para que la página /arbol solo tenga que
 * renderizarla. Si cambia la arquitectura, hay que actualizar este archivo.
 */
export const componentTree = {
  name: 'App',
  file: 'src/App.jsx',
  children: [
    {
      name: 'Router',
      file: 'src/router/router.jsx',
      children: [
        {
          name: 'AppLayout',
          file: 'src/components/layout/AppLayout.jsx',
          children: [
            {
              name: 'Sidebar',
              file: 'src/components/layout/Sidebar.jsx',
              children: [
                {
                  name: 'NavLink (por cada sección)',
                  file: 'react-router-dom',
                },
              ],
            },
            {
              name: 'Outlet',
              file: 'react-router-dom',
              children: [
                {
                  name: 'Home',
                  file: 'src/pages/Home/Home.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                    { name: 'TeamIntro', file: 'src/components/team/TeamIntro.jsx' },
                    {
                      name: 'MemberList',
                      file: 'src/components/team/MemberList.jsx',
                      children: [
                        {
                          name: 'MemberCard',
                          file: 'src/components/team/MemberCard.jsx',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'Members',
                  file: 'src/pages/Members/Members.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                    {
                      name: 'MemberList',
                      file: 'src/components/team/MemberList.jsx',
                      children: [
                        {
                          name: 'MemberCard',
                          file: 'src/components/team/MemberCard.jsx',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'MemberProfile',
                  file: 'src/pages/MemberProfile/MemberProfile.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                    { name: 'MemberCard', file: 'src/components/team/MemberCard.jsx' },
                  ],
                },
                {
                  name: 'Data',
                  file: 'src/pages/Data/Data.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                    { name: 'SearchInput', file: 'src/components/data/SearchInput.jsx' },
                    { name: 'FilterSelect', file: 'src/components/data/FilterSelect.jsx' },
                    {
                      name: 'DataList',
                      file: 'src/components/data/DataList.jsx',
                      children: [
                        {
                          name: 'DataCard',
                          file: 'src/components/data/DataCard.jsx',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'PublicApi',
                  file: 'src/pages/PublicApi/PublicApi.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                    {
                      name: 'WeatherCard',
                      file: 'src/components/api/WeatherCard.jsx',
                    },
                    {
                      name: 'CountryCard',
                      file: 'src/components/api/CountryCard.jsx',
                    },
                  ],
                },
                {
                  name: 'ComponentTreePage',
                  file: 'src/pages/ComponentTree/ComponentTreePage.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                    {
                      name: 'ComponentTree',
                      file: 'src/components/tree/ComponentTree.jsx',
                    },
                  ],
                },
                {
                  name: 'Changelog',
                  file: 'src/pages/Changelog/Changelog.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                    {
                      name: 'DataList',
                      file: 'src/components/data/DataList.jsx',
                      children: [
                        { name: 'ChangelogEntry', file: 'src/pages/Changelog/Changelog.jsx' },
                      ],
                    },
                  ],
                },
                {
                  name: 'AiUsage',
                  file: 'src/pages/AiUsage/AiUsage.jsx',
                  children: [
                    {
                      name: 'PageHeader',
                      file: 'src/components/common/PageHeader.jsx',
                    },
                  ],
                },
                {
                  name: 'NotFound',
                  file: 'src/pages/NotFound/NotFound.jsx',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

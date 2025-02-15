import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import { routes, getLocalizedRoute } from '@/config/routes';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  const navigation = [
    { name: t('nav.home'), href: routes.home },
    { name: t('nav.calculator'), href: routes.calculator },
    { name: t('nav.about'), href: routes.about },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={getLocalizedRoute(routes.home, currentLocale)} className="text-xl font-bold text-indigo-600">
                    AS Funding
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={getLocalizedRoute(item.href, currentLocale)}
                      className={classNames(
                        pathname === getLocalizedRoute(item.href, currentLocale)
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Language Switcher */}
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="flex rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
                    <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {languages.map((lang) => (
                        <Menu.Item key={lang.code}>
                          {({ active }) => (
                            <Link
                              href={`/${lang.code}${pathname.substring(3)}`}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {lang.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Auth Links */}
                <div className="ml-6 flex items-center space-x-4">
                  <Link
                    href={getLocalizedRoute(routes.auth.login, currentLocale)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {t('common.login')}
                  </Link>
                  <Link
                    href={getLocalizedRoute(routes.auth.register, currentLocale)}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t('common.register')}
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.href}
                  as={Link}
                  href={getLocalizedRoute(item.href, currentLocale)}
                  className={classNames(
                    pathname === getLocalizedRoute(item.href, currentLocale)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between px-4">
                  <p className="text-base font-medium text-gray-500">Language</p>
                  <div className="flex space-x-4">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={`/${lang.code}${pathname.substring(3)}`}
                        className={classNames(
                          currentLocale === lang.code
                            ? 'text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700',
                          'text-sm font-medium'
                        )}
                      >
                        {lang.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 
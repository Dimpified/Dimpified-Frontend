import React, { useState } from "react";
import { Heading, Text } from "../Text";
import {
  coreFeatures,
  paymentFeatures,
  businessTools,
  marketingFeatures,
  integrations,
  supportOptions,
  addOns,
  loanOptions,
} from "../../data/Pricing";

// Main Accordion component
const Accordion = () => {
  const [activeTab, setActiveTab] = useState("core");

  const renderCheckmark = (hasFeature) => {
    return hasFeature ? (
      <svg
        className="w-5 h-5 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="w-5 h-5 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <div>
      {/* Feature tabs */}
      <div className="mb-8">
        <Text className="text-lg font-semibold py-4">
          Compare Plans and Features
        </Text>
        <div className="relative">
          {/* Horizontal scroll container for mobile */}
          <div className="overflow-x-auto scrollbar-hide">
            <nav className="flex space-x-8 border-b border-gray-200">
              {[
                { id: "core", name: "Core Features" },
                { id: "business", name: "Business Tools" },
                { id: "marketing", name: "Marketing" },
                { id: "integrations", name: "Integrations" },
                { id: "support", name: "Support" },
                { id: "addons", name: "Add-Ons" },
                { id: "loans", name: "Automated Loans" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-primary3"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Optional fade effect on sides for mobile */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white"></div>
        </div>
      </div>

      {/* Feature tables */}
      <div className="bg-white overflow-hidden sm:rounded-lg mb-12">
        {activeTab === "core" && (
          <div>
            {coreFeatures.map((section) => (
              <div key={section.category} className="border-b border-gray-200">
                <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                  {section.category}
                </Heading>
                <div className="px-6 py-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Feature
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Lite
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Plus
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Pro
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Extra
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {section.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {typeof item.plans.Lite === "boolean"
                                ? renderCheckmark(item.plans.Lite)
                                : item.plans.Lite}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {typeof item.plans.Plus === "boolean"
                                ? renderCheckmark(item.plans.Plus)
                                : item.plans.Plus}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {typeof item.plans.Pro === "boolean"
                                ? renderCheckmark(item.plans.Pro)
                                : item.plans.Pro}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {typeof item.plans.Extra === "boolean"
                                ? renderCheckmark(item.plans.Extra)
                                : item.plans.Extra}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
            {paymentFeatures.map((section) => (
              <div key={section.category} className="border-b border-gray-200">
                <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                  {section.category}
                </Heading>
                <div className="px-6 py-4">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="mb-6">
                      <Heading as="h4" className="text-sm font-medium text-gray-900 mb-2">
                        {item.name}
                      </Heading>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Feature
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Lite
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Plus
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Pro
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Extra
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {item.subitems.map((subitem, subidx) => (
                              <tr key={subidx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                                  {subitem}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  {renderCheckmark(item.plans.Lite[subidx])}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  {renderCheckmark(item.plans.Plus[subidx])}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  {renderCheckmark(item.plans.Pro[subidx])}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  {renderCheckmark(item.plans.Extra[subidx])}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "business" && (
          <div className="border-b border-gray-200">
            <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
              Business Tools
            </Heading>
            <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lite
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Plus
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pro
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Extra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {businessTools.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Lite)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Plus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Pro)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Extra)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "marketing" && (
          <div className="border-b border-gray-200">
            <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
              Marketing & Growth
            </Heading>
            <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lite
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Plus
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pro
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Extra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketingFeatures.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Lite)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Plus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Pro)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Extra)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="border-b border-gray-200">
            <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
              Integrations
            </Heading>
            <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lite
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Plus
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pro
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Extra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {integrations.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Lite)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Plus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Pro)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Extra)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "support" && (
          <div className="border-b border-gray-200">
            <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
              Support
            </Heading>
            <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lite
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Plus
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pro
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Extra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supportOptions.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Lite)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Plus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Pro)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderCheckmark(item.plans.Extra)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "addons" && (
          <div className="border-b border-gray-200">
            <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
              Optional Add-Ons
            </Heading>
            <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Add-On
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lite
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Plus
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pro
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Extra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {addOns.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.prices[0]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.prices[1]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.prices[2]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.prices[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "loans" && (
          <div>
            <Heading className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
              Automated Loans
            </Heading>
            <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Feature
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lite
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Plus
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pro
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Extra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loanOptions.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.values[0]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.values[1]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.values[2]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.values[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        <Text>* Offline features require additional hardware</Text>
      </div>
    </div>
  );
};

export default Accordion;
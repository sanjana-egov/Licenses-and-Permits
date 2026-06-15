// Central copy file — edit string values here to update all UI text

const copy = {
  common: {
    buttons: {
      back: "Back",
      continue: "Continue",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      skipForNow: "Skip for now",
      saveChanges: "Save changes",
    },
    toasts: {
      copySuccess: "Copied",
      inviteLinkCopied: "Invite link copied",
    },
    statusBadges: {
      active: "Active",
      draft: "Draft",
      published: "Published",
      live: "Live",
      assigned: "Assigned",
      invited: "Invited",
      disabled: "Disabled",
    },
    badges: {
      comingSoon: "Coming soon",
      done: "Done",
      required: "Required",
      optional: "Optional",
    },
    errors: {
      invalidEmail: "Invalid email",
    },
  },

  signIn: {
    stepIndicator: {
      stepLabel: "Step 1 of 3 · Sign in",
    },
    header: {
      eyebrow: "Workspace Access",
      heading: "Sign in to your workspace",
      description:
        "Enter your work email and the temporary password shared by your platform team.",
    },
    form: {
      emailLabel: "Email address",
      emailPlaceholder: "you@organization.gov",
      passwordLabel: "Temporary password",
      passwordPlaceholder: "Enter temporary password",
    },
    errors: {
      invalidCredentials:
        "Invalid email or password. Use the credentials listed below.",
    },
    buttons: {
      signIn: "Sign in",
    },
    demoCredentials: {
      sectionToggleLabel: "Demo credentials",
      roleLabelSuperAdmin: "Super Admin",
      roleLabelAdmin: "Admin",
      roleLabelServiceOwner: "Service Owner",
    },
  },

  authShellFeatureCards: {
    header: {
      brandName: "City of Cape Town — Admin Console",
      logoAlt: "City of Cape Town",
    },
    sidePanel: {
      secureAccessBadge: "Secure Access",
    },
    featureCards: {
      card1Title: "Configure without code",
      card1Desc:
        "Set up forms, workflows, fees, and notifications through a visual interface.",
      card2Title: "Multi-service, one workspace",
      card2Desc:
        "Manage all your government services from a single admin console.",
      card3Title: "Role-based access",
      card3Desc:
        "Assign administrators, service owners, and operators with fine-grained permissions.",
      card4Title: "Go live in days",
      card4Desc:
        "Launch citizen-facing portals and employee workspaces directly from templates.",
    },
    trustBar: {
      trustedByLabel: "Trusted by public institutions",
    },
    footer: {
      workspaceLabel: "Secure government workspace",
      versionLabel: "v1.0",
    },
  },

  resetPassword: {
    header: {
      stepLabel: "Step 2 of 3 · Reset password",
      sectionEyebrow: "Secure Password Reset",
      heading: "Set a new password",
      description:
        "For security, replace your temporary password before accessing your workspace.",
    },
    buttons: {
      back: "Back",
      continue: "Continue",
    },
    form: {
      currentPasswordLabel: "Current password",
      currentPasswordPlaceholder: "Enter temporary password",
      newPasswordLabel: "New password",
      newPasswordPlaceholder: "At least 8 characters",
      newPasswordHint: "At least 8 characters. Use a mix of letters and numbers.",
      confirmPasswordLabel: "Confirm new password",
      confirmPasswordPlaceholder: "Re-enter new password",
    },
    errors: {
      incorrectCurrentPassword: "Current password is incorrect.",
      newPasswordTooShort: "New password must be at least 8 characters.",
      newPasswordSameAsCurrent:
        "New password must be different from your current password.",
      passwordsDoNotMatch: "Passwords do not match.",
    },
  },

  confirmOrg: {
    header: {
      welcomeHeading: "Welcome to Licenses and Permits Studio",
      subDescription:
        "Confirm a few details to finish activating your workspace.",
      stepLabel: "Step 3 of 3 · Workspace setup",
    },
    notice: {
      infoText:
        "This information was pre-configured by your implementation partner. Review and confirm before proceeding.",
    },
    logoButton: {
      ariaLabel: "Upload organization logo",
      imgAlt: "Logo",
    },
    regionalSettings: {
      sectionTitle: "Regional Settings",
      editButtonLabel: "Edit",
      editButtonAriaLabel: "Edit regional settings",
      saveButtonLabel: "Save Changes",
      saveButtonAriaLabel: "Lock regional settings",
      jurisdictionLabel: "Operating Jurisdiction",
      jurisdictionPlaceholder: "Select jurisdiction",
      currencyLabel: "Currency",
      currencyPlaceholder: "Select currency",
      countryCodeLabel: "Country code",
      countryCodePlaceholder: "Select code",
      defaultLanguageLabel: "Default language",
      languageHint:
        "You can add and configure additional languages later from Settings.",
      dateFormatLabel: "Date Format",
      financialYearStartLabel: "Financial Year Start",
      dateFormatOptionDDMMYYYY: "DD/MM/YYYY",
      dateFormatOptionMMDDYYYY: "MM/DD/YYYY",
      dateFormatOptionYYYYMMDD: "YYYY-MM-DD",
      financialYearJanuary: "January (Jan – Dec)",
      financialYearApril: "April (Apr – Mar)",
      financialYearJuly: "July (Jul – Jun)",
      financialYearOctober: "October (Oct – Sep)",
      languageOptionEnglish: "English",
    },
    workspaceAccess: {
      sectionTitle: "Workspace Access",
      orgNameLabel: "Organization name",
      workspaceUrlLabel: "Workspace URL",
      copyUrlAriaLabel: "Copy workspace URL",
      workspaceUrlHint:
        "Applicants and employees will access services using this URL.",
    },
    toast: {
      copySuccess: "Workspace URL copied",
      copyError: "Unable to copy",
    },
    footer: {
      backButtonLabel: "Back",
      settingsHint: "You can update these anytime from Workspace Settings.",
      continueButtonLabel: "Continue",
    },
  },

  addAdmins: {
    stepIndicator: {
      stepLabel: "Step 4 of 4 · Admin team",
    },
    header: {
      heading: "Build your admin team",
      subheading: "Invite additional admins to help manage {orgName}.",
      subheadingFallback:
        "Invite additional admins to help manage your organisation.",
    },
    notice: {
      noteLabel: "Note:",
      noteBody:
        "As Super Admin, you are the only person who can create or delete Admin accounts. Admins you invite here will have full platform access except the ability to manage Admin users.",
    },
    form: {
      emailFieldLabel: "Admin email addresses",
      emailPlaceholder: "admin@organisation.gov",
      emailHint: "Press Enter to add. Each admin will receive an email invite.",
    },
    buttons: {
      addEmail: "Add",
      skipForNow: "Skip for now",
      continueWithAdmins: "Continue with {count} admin",
      continueWithAdminsPlural: "Continue with {count} admins",
      continueDefault: "Continue",
    },
    invitedList: {
      sectionLabel: "Invited ({count})",
      sentConfirmation:
        "An invitation email has been sent to each address below.",
      pendingBadge: "Pending acceptance",
    },
    tooltips: {
      copyInviteLink: "Copy invite link",
      resendInviteEmail: "Resend invite email",
    },
    toasts: {
      invalidEmailTitle: "Invalid email",
      inviteLinkCopiedTitle: "Invite link copied",
      inviteResentTitle: "Invite resent to {email}",
    },
  },

  dashboard: {
    statusBadges: {
      draft: "Draft",
      published: "Published",
      live: "Live",
      assigned: "Assigned",
    },
    serviceCard: {
      fromTemplate: "From template",
      flowsSingular: "{count} flow",
      flowsPlural: "{count} flows",
      deleteAriaLabel: "Delete {serviceName}",
      awaitingSetup: "Awaiting setup",
      viewButton: "View",
      editButton: "Edit",
      configureButton: "Configure",
      goLiveButton: "Go Live",
      setUpButton: "Set up",
    },
    header: {
      titleAdmin: "Configure and Launch Licenses and Permits",
      titleServiceOwner: "Your Services",
      subtitleAdmin:
        "Configure Licenses and Permits applications to manage end-to-end delivery of service to the citizen.",
      subtitleServiceOwner:
        "Configure and manage the services you own.",
    },
    metrics: {
      totalServices: "Total Services",
      drafts: "Drafts",
      live: "Live",
      assigned: "Assigned",
    },
    emptyState: {
      getStartedBadge: "Get Started",
      heading: "Set up your first application",
      description: "Choose from a ready-made template to launch in minutes.",
      chooseTemplateButton: "Choose Template",
    },
    sections: {
      myServicesHeading: "My Services",
      addServiceButton: "Add service",
      assignedHeading: "Assigned",
      assignedSubtext: "— waiting for owners to set up",
      assignedToYouHeading: "Assigned to you",
      browseTemplatesButton: "Browse templates",
      noServicesYet: "You haven't created any services yet.",
    },
    deleteDialog: {
      title: "Delete \"{serviceName}\"?",
      description:
        "This permanently removes the service and its configuration (forms, workflow, fees, documents).",
      liveWarning: " Live services will go offline immediately.",
      confirmInputLabel: "Type {serviceName} to confirm",
      cancelButton: "Cancel",
      deleteButton: "Delete",
    },
    toastMessages: {
      deleteSuccess: "\"{serviceName}\" deleted",
    },
  },

  services: {
    header: {
      pageTitle: "Templates",
      pageSubtitle:
        "Choose a ready-to-use application template to get started quickly.",
    },
    templateCard: {
      comingSoonBadge: "Coming soon",
      alsoCalledLabel: "Also called:",
    },
    templateDetailView: {
      backButton: "Back to Templates",
      comingSoonBadge: "Coming soon",
      alsoCalledLabel: "Also called:",
      assignToTeammateButton: "Assign to teammate",
      useThisTemplateButton: "Use this template",
      setupTimeLabel: "Setup time: {estimatedSetupTime}",
    },
    stats: {
      flowsLabel: "Flows",
      rolesLabel: "Roles",
      formsLabel: "Forms",
      setupLabel: "Setup",
    },
    livePreview: {
      livePreviewBadge: "Live Preview",
      interactiveHint:
        "Click through to navigate the app · Switch roles above to explore different views",
    },
    howItWorks: {
      sectionHeading: "How it works",
    },
    flowsSection: {
      sectionHeading: "Flows",
      modifyFlowsButton: "Modify Flows",
      stepsCountBadge: "{count} steps",
    },
    rolesSection: {
      sectionHeading: "Roles",
      addEditRolesButton: "Add/Edit Roles",
    },
    formsSection: {
      sectionHeading: "Forms",
      addEditFieldsButton: "Add/Edit Fields",
    },
    notificationsSection: {
      sectionHeading: "Notifications",
      addEditNotificationsButton: "Add/Edit Notifications",
    },
    paymentsSection: {
      sectionHeading: "Payments",
      editPaymentLogicButton: "Edit Payment Logic",
    },
    customizeSection: {
      sectionHeading: "Customize",
      formsChip: "Forms",
      rolesChip: "Roles",
      fieldsChip: "Fields",
      workflowChip: "Workflow",
      notificationsChip: "Notifications",
      documentsChip: "Documents",
      chipTooltip: "Editable in {chipLabel} settings",
    },
  },

  step1Identity: {
    header: {
      heading: "Set up your application",
      subheading:
        "Name your service. This is how your employees and citizens will view the service in their interfaces.",
    },
    form: {
      applicationNameLabel: "Application name",
      applicationNamePlaceholder: "{templateName}",
      helperText:
        "Prefilled from the {templateName} template. You can rename it any time.",
    },
    errors: {
      duplicateNameError: "An application with this name already exists.",
    },
    buttons: {
      continueButton: "Continue",
    },
  },

  step2Modules: {
    header: {
      heading: "Select modules for your service",
      subheading:
        "Include the following use cases in your service. You can update these at any time.",
    },
    issuanceCard: {
      title: "Issuance",
      badgeLabel: "Default",
      description:
        "Accept applications, review, approve, and issue new licenses.",
    },
    renewalCard: {
      title: "Renewal",
      description: "Allow citizens to renew existing licenses before expiry.",
      conditionalNote:
        "Renewal policies can later be configured separately for categories and subcategories.",
    },
    buttons: {
      continue: "Continue",
    },
  },

  step3Categories: {
    header: {
      title: "Let's structure your licenses",
      subtitle:
        "A few quick questions help us pre-configure your application correctly.",
    },
    categoriesCard: {
      questionLabel: "Do you have license categories?",
      exampleHint: "For example: Retail, Manufacturing, Hospitality.",
    },
    subcategoriesCard: {
      questionLabel: "Do you have license subcategories?",
      exampleHint:
        "For example: Restaurant under Hospitality, Bakery under Retail.",
    },
    toggle: {
      yes: "Yes",
      no: "No",
    },
    dropzone: {
      uploadPromptBold: "Click to upload",
      uploadPromptSuffix: "or drag a file",
      acceptedFormats: "CSV or Excel (.csv, .xlsx)",
      skipHint: "Skip for now and add it later from the configurator.",
      downloadSampleLink: "Download sample file",
    },
    buttons: {
      continue: "Continue",
    },
  },

  step4Initializing: {
    header: {
      heading: "Building your service",
      subheading: "We're preparing everything based on your template.",
    },
    tasks: {
      creatingApplication: "Creating {serviceName} application",
      configuringModules: "Configuring modules",
      preparingWorkflows: "Preparing workflows",
      settingUpRenewals: "Setting up renewals",
      preparingDocumentTemplates: "Preparing document templates",
      linkingCategories: "Linking categories",
      generatingExperiences: "Generating citizen and employee experiences",
    },
    taskStatus: {
      skippedLabel: "(skipped)",
    },
  },

  overviewWorkspace: {
    heroBadge: {
      live: "Live",
      readyForLaunch: "Ready for Launch",
      ready: "Ready",
    },
    heroDescription: {
      generatedSuccessfully:
        "This service has been generated successfully from the {templateName} template. You can publish it immediately using default configurations or review and customize it before going live.",
    },
    heroButtons: {
      goLive: "Go Live",
      previewExperience: "Preview Experience",
      customizeService: "Configure Application",
    },
    serviceReadiness: {
      sectionHeading: "Service Readiness",
      modulesSelected: "Modules Selected",
      businessCategoriesConfigured: "Business Categories Configured",
      citizenPortalGenerated: "Citizen Portal Generated",
      employeeWorkspaceGenerated: "Employee Workspace Generated",
      renewalPolicyConfigured: "Renewal Policy Configured",
      dashboard: "Dashboard",
      dashboardBadge: "Auto-generated",
    },
    renewalPolicy: {
      notEnabled: "Not enabled",
      globalMonths: "{count} Months (Global)",
      categoryBased: "Category Based",
      subcategoryBased: "Subcategory Based",
      configured: "Configured",
    },
    summarize: {
      none: "None",
      moreItems: "+{count} more",
    },
    templateSetup: {
      sectionHeading: "Template Setup",
      templateLabel: "Template",
      modulesLabel: "Modules",
      categoriesLabel: "Categories",
      categoriesConfigured: "{count} configured",
      renewalPolicyLabel: "Renewal Policy",
      editSetup: "Edit setup",
    },
    generatedExperiences: {
      sectionHeading: "Generated Experiences",
      citizenPortalTitle: "Citizen Portal",
      citizenPortalDescription:
        "Applicants can apply, pay fees, track status, and download licenses.",
      employeeWorkspaceTitle: "Employee Workspace",
      employeeWorkspaceDescription:
        "Officials can review applications, process approvals, and issue licenses.",
    },
    boundaryConfiguration: {
      sectionHeading: "Boundary Configuration",
      noBoundariesTitle: "No boundaries configured",
      noBoundariesDescription:
        "Set up a boundary hierarchy in Application Areas for this service to go live.",
      systemDefaultBadge: "System default",
      geographicBadge: "Geographic",
      limitedBadge: "Limited",
      operationalLevelLabel: "Operational level: {levelName}",
      levelsSuffix: "{count} levels",
      changeButton: "Change",
    },
    nextActions: {
      sectionHeading: "What would you like to do next?",
      previewExperienceTitle: "Preview Experience",
      previewExperienceDescription:
        "Review citizen and employee journeys generated from the template.",
      customizeServiceTitle: "Configure Application",
      customizeServiceDescription:
        "Modify forms, workflows, notifications, payments, roles, and SLA rules.",
      monitorManageTitle: "Monitor & Manage",
      monitorManageDescriptionLive:
        "Track applications, SLA performance, and manage deployment.",
      monitorManageDescriptionNotLive:
        "Available after the service goes live.",
    },
  },

  notificationsManager: {
    header: {
      pageTitle: "{moduleName} — Notifications",
      pageSubtitle: "Each notification targets one channel and one role",
      createButton: "Create New Notification",
      createButtonDisabledTitle:
        "Enable this integration in Settings to configure notifications for this channel.",
    },
    infoBanner: {
      description:
        "One notification = one channel + one recipient role. Changes here flow into the Workflow and the Service Preview.",
    },
    channelCards: {
      emailLabel: "Email",
      emailSubtitle: "Configure email notifications for applicants",
      smsLabel: "SMS",
      smsSubtitle: "Configure SMS notifications for applicants",
      pushLabel: "Push",
      pushSubtitle: "In-app push to officers and applicants",
      activeStatus: "Active",
      notConfiguredStatus: "Not configured",
      addChannelButtonDisabledTitle:
        "Enable this integration in Settings to configure notifications for this channel.",
    },
    notificationList: {
      searchPlaceholder: "Search Notifications",
      channelNotEnabledNotice:
        "Enable this integration in Settings to configure notifications for this channel.",
      channelNotEnabledSettings: "Settings",
      emptyState: "No {channelLabel} notifications yet.",
      noSubjectFallback: "(no subject)",
      recipientBadgePrefix: "To: {roleName}",
      editButton: "Edit",
      duplicateButton: "Duplicate",
      deleteButton: "Delete",
    },
    dialog: {
      titleNew: "New Notification",
      titleEdit: "Edit Notification",
      channelLabel: "Channel",
      workflowStateLabel: "Workflow State *",
      workflowStatePlaceholder: "Select state",
      recipientRoleLabel: "Recipient Role *",
      recipientRolePlaceholder: "Select role",
      subjectLabel: "Subject *",
      messageBodyLabel: "Message Body *",
      smsCharCount: "{charCount}/160",
      pushMessageHint: "Delivered to the recipient's in-app inbox.",
      personalizationLabel: "Personalization:",
      smsApprovalNotice:
        "Some countries require SMS templates to be approved by telecom providers before sending. Verify requirements for your country and register the template with your SMS provider if needed.",
      cancelButton: "Cancel",
      saveButton: "Save",
    },
    toast: {
      savedTitle: "Notification saved",
      savedDescription: "{channelLabel} · {workflowState}",
    },
  },

  workflowDesigner: {
    header: {
      title: "{moduleName} — Workflow",
      subtitle: "Capture every state and action in your process",
      viewToggleVisual: "Visual",
      viewToggleTable: "Table",
      saveButton: "Save",
      addStateButton: "Add State",
      addActionButton: "Add Action",
    },
    emptyState: {
      heading: "Start by adding your first state",
      description: "Define the steps in your process flow.",
      addFirstStateButton: "Add First State",
    },
    canvas: {
      panZoomHint: "Drag empty area to pan • Ctrl/⌘ + scroll to zoom",
      zoomInTitle: "Zoom in",
      zoomOutTitle: "Zoom out",
      resetViewTitle: "Reset view",
      zoomPercent: "{zoom}%",
    },
    tableView: {
      statesTab: "States ({count})",
      actionsTab: "Actions ({count})",
      statesColumnName: "Name",
      statesColumnType: "Type",
      statesColumnPaymentStage: "Payment Stage",
      statesColumnNotifications: "Notifications",
      actionsColumnFrom: "From",
      actionsColumnTo: "To",
      actionsColumnAction: "Action",
      actionsColumnRole: "Role",
      actionsColumnChecklists: "Checklists",
    },
    stateTypeBadges: {
      start: "Start",
      inProgress: "In Progress",
      end: "End",
    },
    inspector: {
      collapseAriaLabel: "Collapse inspector",
      expandAriaLabel: "Expand inspector",
      emptySelectionMessage:
        "Select a state or action to view its properties.",
    },
    stateInspector: {
      heading: "State Properties",
      subheading: "Lifecycle status configuration",
      stateNameLabel: "State Name",
      stateTypeLabel: "State Type",
      stateTypeStart: "Start",
      stateTypeInProgress: "In Progress",
      stateTypeEnd: "End",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Short description",
      paymentSectionTitle: "Payment collected here",
      paymentSectionDescription:
        "Pick a configured payment stage to charge the citizen when the application enters this state.",
      paymentSelectPlaceholder: "No payment",
      paymentNoPaymentOption: "No payment",
      paymentEditTitle: "Edit stage",
      newPaymentStageButton: "New payment stage",
      notificationsLabel: "Notifications on entry",
      notificationsNoneAttached: "None attached",
      notificationsCountAttached: "{count} attached",
      notificationsNoneConfigured: "No notifications configured yet.",
      newNotificationButton: "New notification",
      attachedDocumentsLabel: "Attached documents",
      attachedDocumentsNoneAttached: "None attached",
      attachedDocumentsNoneConfigured:
        "No documents configured yet — add them in Document Designer.",
      deleteStateButton: "Delete State",
    },
    transitionInspector: {
      actionBadge: "Action",
      fromToLabel: "From {fromName} → {toName}",
      actionNameLabel: "Action Name",
      fromLabel: "From",
      toLabel: "To",
      performedByRoleLabel: "Performed by (Role)",
      createNewRoleOption: "+ Create new role…",
      checklistsLabel: "Checklists to complete",
      checklistsNoneAttached: "None attached",
      checklistsCountAttached: "{count} attached",
      checklistsNoneConfigured: "No checklists configured yet.",
      checklistQuestionCount: "{count} question",
      checklistQuestionCountPlural: "{count} questions",
      newChecklistButton: "New checklist",
      addConditionsLabel: "Add Conditions",
      addConditionsDescription:
        "When enabled, this action only appears if specific metadata criteria are met.",
      deleteActionButton: "Delete Action",
    },
    addStateDialog: {
      title: "Add State",
      stateNameLabel: "State Name",
      stateNamePlaceholder: "e.g. \"Technical Review\"",
      stateTypeLabel: "State Type",
      stateTypeStart: "Start",
      stateTypeInProgress: "In Progress",
      stateTypeEnd: "End",
      cancelButton: "Cancel",
      addStateButton: "Add State",
    },
    addActionDialog: {
      title: "Add Action",
      actionNameLabel: "Action Name",
      actionNamePlaceholder: "e.g. \"Approve\"",
      fromStateLabel: "From State",
      fromStatePlaceholder: "Select...",
      toStateLabel: "To State",
      toStatePlaceholder: "Select...",
      performedByRoleLabel: "Performed by (Role)",
      createNewRoleOption: "+ Create new role…",
      cancelButton: "Cancel",
      addButton: "Add",
    },
    notificationEditDialog: {
      title: "Notification",
      description: "Fired when the application enters this state.",
      channelLabel: "Channel",
      channelEmail: "email",
      channelSms: "sms",
      channelPush: "push",
      workflowStateLabel: "Workflow State *",
      workflowStatePlaceholder: "Select state",
      recipientRoleLabel: "Recipient Role *",
      recipientRolePlaceholder: "Select role",
      subjectLabel: "Subject",
      messageLabel: "Message",
      variablesLabel: "Variables:",
      deleteButton: "Delete",
      cancelButton: "Cancel",
      saveButton: "Save",
    },
    checklistEditDialog: {
      title: "Checklist",
      description:
        "Items the assignee must complete before this action runs.",
      nameLabel: "Name",
      workflowStateLabel: "Workflow State",
      workflowStatePlaceholder: "Select",
      questionPlaceholder: "Question text",
      requiredLabel: "Required",
      addQuestionButton: "Add Question",
      deleteButton: "Delete",
      cancelButton: "Cancel",
      saveButton: "Save",
    },
    paymentStageEditDialog: {
      title: "Payment Stage",
      description: "Configure when and how the citizen pays.",
      stageNameLabel: "Stage Name",
      stageNamePlaceholder: "e.g. Application Fee",
      workflowStateLabel: "Workflow State",
      workflowStatePlaceholder: "Select",
      feesLabel: "Fees",
      methodsLabel: "Methods",
      methodOnline: "online",
      methodCounter: "counter",
      gatewayLabel: "Gateway",
      gatewayRazorpay: "Razorpay",
      gatewayPaygov: "PayGov",
      gatewayCustom: "Custom",
      generateReceiptLabel: "Generate Receipt",
      deleteButton: "Delete",
      cancelButton: "Cancel",
      saveButton: "Save",
    },
    scopeBar: {
      applyToLabel: "Apply to:",
      editingLabel: "Editing:",
      categoryPlaceholder: "Pick a category",
      categoryWorkflowNote:
        "Changes apply only to this category's workflow.",
    },
    toastMessages: {
      workflowSaved: "Workflow saved",
      onlyOneStartState: "Only one Start state allowed",
      cannotDeleteOnlyStart: "Cannot delete the only Start state",
      stateDeleted: "State \"{stateName}\" deleted",
      roleCreated: "Role \"{roleName}\" created",
    },
    confirmDialogs: {
      deleteStateWithActions:
        "Delete \"{stateName}\"?\n\nThis will also remove {count} action{plural} connected to it.",
    },
    editTooltips: {
      editNotification: "Edit",
      editChecklist: "Edit",
      editStage: "Edit stage",
    },
    fieldTypes: {
      text: "Text",
      radio: "Radio",
      checkbox: "Checkbox",
      dropdown: "Dropdown",
      fileUpload: "File Upload",
    },
  },

  rolesDesigner: {
    header: {
      title: "Roles Designer",
      subtitle: "Define who can access and act on this service",
      createButtonLabel: "Create New Role",
    },
    notice: {
      infoMessage:
        "Changes to roles automatically flow into Workflow steps, the Service Preview and every related configuration.",
    },
    search: {
      placeholder: "Search role",
    },
    emptyState: {
      noResultsMessage: "No roles match your search.",
    },
    roleCard: {
      defaultBadge: "Default",
      citizenTypeBadge: "Citizen",
      employeeTypeBadge: "Employee",
      noWorkflowStepsBadge: "No workflow steps",
      workflowStepsSingularBadge: "{tx} workflow step",
      workflowStepsPluralBadge: "{tx} workflow steps",
      editRoleAriaLabel: "Edit role",
      deleteRoleAriaLabel: "Delete role",
    },
    deleteDialog: {
      title: "Delete role \"{pendingDeleteName}\"?",
      description:
        "Workflow steps assigned to this role will need to be reassigned manually. This cannot be undone.",
      cancelButton: "Cancel",
      confirmButton: "Delete",
    },
    toasts: {
      roleUpdated: "Role updated",
      roleCreated: "Role created",
      roleDeleted: "Deleted \"{roleName}\"",
    },
  },

  feesConfigurator: {
    header: {
      pageTitle: "Fees",
      breadcrumb: "Business License > {moduleName}",
      addFeeButton: "Add Fee",
    },
    infoNotice: {
      helperText:
        "Define fee components for this service. These fees will be used in payment configuration.",
    },
    emptyState: {
      heading: "No fees configured",
      description: "Add your first fee to get started.",
      addFirstFeeButton: "Add First Fee",
    },
    feeCard: {
      typeLabel: "Type: {feeTypeLabel}",
      amountLabel: "Amount: {currency} {amount}",
      statusActive: "Active",
      statusDraft: "Draft",
      mandatoryIndicatorTooltip: "Mandatory",
      editButton: "Edit",
      duplicateButtonAriaLabel: "Duplicate",
      deleteButtonAriaLabel: "Delete",
    },
    feeTypeOptions: {
      fixedLabel: "Fixed Fee",
      fixedDescription: "A flat amount charged every time",
      slabLabel: "Slab Based",
      slabDescription: "Amount varies by condition ranges",
      conditionalLabel: "Conditional",
      conditionalDescription: "Charged only when a condition is met",
      formulaLabel: "Formula Based",
      formulaDescription: "Calculated using a formula",
    },
    sheet: {
      createTitle: "Create Fee",
      editTitle: "Edit Fee",
    },
    form: {
      feeNameLabel: "Fee Name",
      feeNamePlaceholder: "e.g. Application Fee",
      feeCodeLabel: "Fee Code",
      feeCodeHint: "Auto-generated from name. Editable.",
      feeTypeLabel: "Fee Type",
    },
    fixedFeeSection: {
      sectionHeading: "Fixed Fee",
      amountLabel: "Amount",
      currencyLabel: "Currency",
      currencyINR: "₹ INR",
      currencyUSD: "$ USD",
      currencyEUR: "€ EUR",
    },
    slabSection: {
      sectionHeading: "Slab Configuration",
      conditionColumnHeader: "Condition",
      amountColumnHeader: "Amount",
      conditionPlaceholder: "e.g. 0–100 sq ft",
      addSlabButton: "Add Slab",
    },
    conditionalSection: {
      sectionHeading: "Condition",
      fieldLabel: "Field",
      operatorLabel: "Operator",
      valueLabel: "Value",
      valuePlaceholder: "e.g. Restaurant",
      feeAmountLabel: "Fee Amount",
    },
    formulaSection: {
      sectionHeading: "Formula",
      expressionLabel: "Expression",
      expressionPlaceholder: "e.g. Area × Rate",
      availableVariablesLabel: "Available variables:",
    },
    mandatoryToggle: {
      label: "Mandatory Fee",
      description: "This fee must be paid to proceed",
    },
    saveButton: {
      label: "Save Fee",
    },
  },

  formBuilder: {
    header: {
      titleSingleModule: "Form",
      titleMultiModule: "{moduleName} — Form",
      subtitle: "Design the citizen application form for this flow",
      togglePreviewHide: "Hide preview",
      togglePreviewShow: "Show preview",
      togglePreviewTooltip: "Toggle citizen mobile preview",
      help: "Help",
    },
    stepTabs: {
      addStep: "Add Step",
    },
    fieldPalette: {
      sectionHeading: "Form Fields",
      searchPlaceholder: "Search fields...",
      categoryInputFields: "Input Fields",
      categorySelection: "Selection",
      categoryUpload: "Upload",
      fieldName: "Name",
      fieldAddress: "Address",
      fieldPhone: "Phone",
      fieldEmail: "Email",
      fieldNumeric: "Numeric",
      fieldTextInput: "Text Input",
      fieldTextArea: "Text Area",
      fieldDatePicker: "Date Picker",
      fieldRadio: "Radio",
      fieldCheckbox: "Checkbox",
      fieldDropdown: "Dropdown",
      fieldSelectionTag: "Selection Tag",
      fieldFileUpload: "File Upload",
    },
    canvas: {
      stepCounter: "Step {activeStepIndex} of {totalSteps}",
      addSubscreen: "Add Sub-screen",
      subScreenBadgeOptional: "Optional",
      subScreenBadgeMap: "Map",
      mapPlaceholder: "Map placeholder (citizen drops a pin)",
      emptyActiveSubscreen:
        "Click a field type on the left to add fields here",
      emptyInactiveSubscreen: "Click this sub-screen to add fields",
      fieldDeleteTooltip: "Delete field",
      fileUploadPrompt: "Click or drag to upload",
      dropdownSelectPlaceholder: "Select {fieldLabel}",
      defaultFieldOption1: "Option 1",
      defaultFieldOption2: "Option 2",
    },
    canvasNavigation: {
      stepPaginationLabel: "{currentStep} / {totalSteps}",
      deleteSubscreenTooltip: "Delete sub-screen",
    },
    propertiesPanel: {
      headingFieldProperties: "Field Properties",
      headingSubscreenProperties: "Sub-screen Properties",
      backToSubscreen: "← Back to sub-screen",
      tabElements: "Elements",
      tabLogic: "Logic",
    },
    fieldProperties: {
      labelFieldLabel: "Field Label",
      labelFieldType: "Field Type",
      labelPlaceholder: "Placeholder",
      labelHelpText: "Help Text",
      sectionValidation: "Validation",
      labelRequired: "Required",
      labelMinLength: "Min Length",
      labelMaxLength: "Max Length",
      labelMinValue: "Min Value",
      labelMaxValue: "Max Value",
      labelPatternRegex: "Pattern (Regex)",
      patternPlaceholder: "e.g. ^[A-Z]+",
      labelPatternMessage: "Pattern Message",
      patternMessagePlaceholder: "Shown when pattern fails",
      labelPastDateOnly: "Past date only",
      sectionOptions: "Options",
      addOptionButton: "Add Option",
      deleteFieldButton: "Delete Field",
    },
    validationBadges: {
      minLength: "Min length {value}",
      maxLength: "Max length {value}",
      min: "Min {value}",
      max: "Max {value}",
      pattern: "Pattern",
      patternWithMessage: "Pattern: {patternMessage}",
      pastDateOnly: "Past date only",
      conditional: "Conditional",
      dependentOptions: "Dependent options",
    },
    subscreenProperties: {
      labelStepName: "Step Name",
      labelSubscreenTitle: "Sub-screen Title",
      labelSubtitle: "Subtitle",
      labelHelperBanner: "Helper Banner",
      helperBannerPlaceholder: "Shown above fields as a helper banner",
      labelOptionalSubscreen: "Optional sub-screen",
      labelMapPlaceholder: "Map placeholder",
      sectionFieldsInSubscreen: "Fields in this sub-screen",
      noFieldsYet: "No fields yet",
      deleteStepButton: "Delete Step",
      validationTooltip: "Has validation or conditional logic",
    },
    logicTab: {
      emptyStateHeading: "Conditional Logic",
      emptyStateDescription:
        "Select a field to view or edit its visibility rules and dependent options.",
      sectionConditionalVisibility: "Conditional Visibility",
      clearButton: "Clear",
      conditionalVisibilityDescription:
        "Show this field only when {parentLabel} equals {equalsValue}.",
      labelDependsOnField: "Depends on field",
      labelEquals: "Equals",
      chooseValuePlaceholder: "Choose value",
      noVisibilityRuleSet: "No visibility rule set.",
      addVisibilityRuleButton: "Add visibility rule",
      sectionDependentOptions: "Dependent Options",
      dependentOptionsDescription:
        "Options change based on {parentLabel}.",
      labelParentField: "Parent field",
      labelOptionsPerParentValue: "Options per parent value",
      parentHasNoOptions: "Parent has no options yet.",
      commaSeparatedPlaceholder: "comma-separated",
      noDependentOptionsRuleSet: "No dependent-options rule set.",
      addDependencyButton: "Add dependency",
    },
    preview: {
      emulatorLabel: "Citizen view",
    },
    footer: {
      editingNotice: "Editing {moduleName} form. Changes are saved per module.",
      backButton: "Back",
      saveFormButton: "Save Form",
    },
    toasts: {
      cannotDeleteLastStep: "Cannot delete the last step",
      stepDeleted: "Step deleted",
      stepNeedsAtLeastOneSubscreen: "Step needs at least one sub-screen",
      fieldDeleted: "Field deleted",
      formSavedTitle: "{moduleName} form saved",
      formSavedDescription: "Preview will reflect your changes.",
    },
    defaults: {
      untitledField: "Untitled Field",
      newQuestion: "New question",
      stepName: "Step {stepNumber}",
      defaultOption1: "Option 1",
      defaultOption2: "Option 2",
      dynamicOptionLabel: "Option {optionNumber}",
    },
  },

  goLive: {
    header: {
      backButton: "Back",
      pageTitle: "Ready to go live?",
      pageDescriptionWithService:
        "Launch \"{serviceName}\" by completing the steps below.",
      pageDescriptionGeneric:
        "Complete the required steps below, then launch your application.",
    },
    checklistSections: {
      requiredSectionLabel: "Required",
      optionalSectionLabel: "Optional",
    },
    requiredItems: {
      boundarySetupLabel: "Boundary Setup",
      boundarySetupDescription:
        "Configure geographic boundaries for the service",
      userAccessLabel: "User Access & Authentication",
      userAccessDescription:
        "Set access type and sign-in method per role",
    },
    optionalItems: {
      customizeThemeLabel: "Customize Theme",
      customizeThemeDescription: "Brand colors and appearance",
      integrationsLabel: "Integrations",
      integrationsDescription: "Connect external applications",
      additionalLanguagesLabel: "Additional Languages",
      additionalLanguagesDescription: "Add more language support",
    },
    badges: {
      doneBadge: "Done",
      requiredBadge: "Required",
      optionalBadge: "Optional",
    },
    comingSoonDialog: {
      dialogTitle: "Coming soon",
      dialogDescription:
        "{comingSoonFor} will be available in an upcoming release. Stay tuned!",
    },
    actions: {
      goLiveButton: "Go Live",
      incompleteNotice: "Complete all required steps to enable Go Live",
    },
  },

  usersAccess: {
    header: {
      pageTitle: "Users & Access",
      pageDescription:
        "Manage people, roles, and service permissions across your platform.",
      limitedAccessBadge: "Limited access — Admin invite only",
      inviteUserButton: "Invite User",
    },
    tabs: {
      usersTab: "Users",
      rolesTab: "Roles & Permissions",
      activityTab: "Activity Log",
    },
    metricsCards: {
      totalUsersLabel: "Total Users",
      totalUsersHint: "Across all services",
      systemUsersLabel: "System Users",
      systemUsersHint: "Platform-level access",
      serviceUsersLabel: "Service Users",
      serviceUsersHint: "Scoped to services",
      pendingInvitesLabel: "Pending Invites",
      pendingInvitesHint: "Awaiting acceptance",
    },
    userFilters: {
      allUsers: "All Users",
      system: "System",
      service: "Service",
      invited: "Invited",
    },
    usersSearchPlaceholder: "Search by name, email, or role",
    usersTable: {
      columnUser: "User",
      columnRole: "Role",
      columnServiceScope: "Service Scope",
      columnStatus: "Status",
      columnLastActive: "Last Active",
      emptyState: "No users match your filters.",
      superAdminBadge: "Super Admin",
      paginationPageCount: "Page 1 of 1",
    },
    userRowActions: {
      editRole: "Edit role",
      resendInvite: "Resend invite",
      disableUser: "Disable user",
      reEnableUser: "Re-enable user",
      remove: "Remove",
    },
    statusBadges: {
      active: "Active",
      invited: "Invited",
      disabled: "Disabled",
    },
    actionBadges: {
      invited: "Invited",
      acceptedInvite: "Accepted invite",
      roleChanged: "Role changed",
      disabled: "Disabled",
      reEnabled: "Re-enabled",
      removed: "Removed",
      resentInvite: "Resent invite",
      adminCreated: "Admin created",
      adminDeleted: "Admin deleted",
    },
    rolesTab: {
      systemRolesSectionLabel: "System Roles",
      systemRolesSectionHelper:
        "Platform-level roles that span the whole organization.",
      serviceRolesSectionLabel: "Service Roles",
      serviceRolesSectionHelper:
        "Operational roles scoped to one or more services.",
      onePerOrgBadge: "1 per org",
      userSingular: "user",
      userPlural: "users",
      platformWide: "Platform-wide",
      managePermissionsButton: "Manage permissions",
      viewUsersButton: "View users",
    },
    activityLog: {
      immutableNotice:
        "This log is immutable and read-only. All user and role actions are recorded here and cannot be deleted.",
      searchPlaceholder: "Search by actor, user, or role",
      allActionsOption: "All actions",
      columnTimestamp: "Timestamp",
      columnActor: "Actor",
      columnAction: "Action",
      columnAffectedUser: "Affected User",
      columnRole: "Role",
      columnService: "Service",
      emptyState: "No activity log entries match your filters.",
      readOnlyLabel: "Read-only",
    },
    toasts: {
      cannotRemoveSuperAdminTitle: "Cannot remove Super Admin",
      cannotRemoveSuperAdminDescription:
        "The Super Admin account cannot be removed.",
      userRemovedTitle: "User removed",
      inviteResentTitle: "Invite resent",
    },
  },

  inviteUserSheet: {
    header: {
      title: "Invite users",
      description:
        "Send invitations to join your platform with a specific role.",
    },
    emailField: {
      label: "Email addresses",
      placeholder: "name@org.in, …",
      helperText: "Press Enter or comma to add. Multiple invites allowed.",
    },
    roleField: {
      label: "Role",
      selectPlaceholder: "Select a role",
      systemRolesGroupLabel: "System Roles",
      serviceRolesGroupLabel: "Service Roles",
    },
    servicesField: {
      label: "Services",
      helperText:
        "Service roles must be scoped to one or more services.",
    },
    buttons: {
      cancel: "Cancel",
      sendInvite: "Send invite",
      sendInvites: "Send invites ({count})",
    },
    toasts: {
      invalidEmailTitle: "Invalid email",
      noEmailTitle: "Add at least one email",
      noRoleTitle: "Pick a role",
      noServiceTitle: "Select at least one service",
      invitedSingleTitle: "Invited {count} person",
      invitedMultipleTitle: "Invited {count} people",
    },
  },

  roleDetailSheet: {
    header: {
      serviceBadgeLabel: "Service",
      systemBadgeLabel: "System",
      userCountSingular: "{userCount} user assigned",
      userCountPlural: "{userCount} users assigned",
    },
    serviceAssignment: {
      sectionHeading: "Service Assignment",
      sectionDescription: "Choose which services this role applies to.",
    },
    workflowStageAccess: {
      sectionHeading: "Workflow Stage Access",
      sectionDescription:
        "Limit this role to specific stages per service.",
    },
    permissions: {
      sectionHeading: "Permissions",
      sectionDescription: "Set the access level for each capability.",
    },
    dialogs: {
      discardChangesConfirm: "Discard unsaved changes?",
    },
    toast: {
      roleUpdatedTitle: "Role updated",
      roleUpdatedDescription: "{roleName} permissions saved.",
    },
    buttons: {
      cancel: "Cancel",
      saveChanges: "Save changes",
    },
  },

  organizationProfile: {
    header: {
      pageTitle: "Organization Profile",
      pageDescription:
        "Your organization details collected during onboarding.",
    },
    card: {
      sectionTitle: "Details",
    },
    fieldLabels: {
      orgName: "Organization Name",
      country: "Country",
      department: "Department",
      language: "Language",
      themeColor: "Theme Color",
      logo: "Logo",
    },
    fallbackValues: {
      notSet: "Not set",
      noLogoUploaded: "No logo uploaded",
    },
    imageAlt: {
      orgLogo: "Organization logo",
    },
  },

  brandingTheme: {
    header: {
      pageTitle: "Branding & Theme",
      pageSubtitle:
        "Customize the look and feel of your citizen-facing portal",
      scopeTabService: "This service",
      scopeTabPlatform: "Platform default",
      applyThemeButton: "Apply Theme",
    },
    leftPanel: {
      sectionTitle: "Theme Properties",
    },
    themePresets: {
      sectionLabel: "Theme Presets",
      presetNameDigit: "DIGIT Theme",
      presetDescriptionDigit: "Roboto, warm orange & teal, minimal radius",
      presetNameCivic: "Civic Blue",
      presetDescriptionCivic:
        "Public Sans, civic blue, soft rounded corners",
      presetNameBold: "Bold Slate",
      presetDescriptionBold:
        "Inter, dark slate + orange accent, pill buttons",
      presetNameTeal: "Teal Modern",
      presetDescriptionTeal: "DM Sans, teal primary, pill buttons",
    },
    fontFamily: {
      sectionLabel: "Font Family",
    },
    primaryColour: {
      sectionLabel: "Primary Colour",
      helpText: "10 curated government-friendly colours",
    },
    logo: {
      sectionLabel: "Logo",
      uploadCta: "Click to upload logo",
      uploadHint: "PNG, SVG, JPG up to 5 MB",
    },
    brandGuidelines: {
      sectionLabel: "Brand Guidelines",
      uploadCta: "Click to upload guidelines",
      uploadHint: "PDF, PNG, SVG up to 10 MB",
    },
    portalName: {
      sectionLabel: "Name on the Header",
      placeholder: "e.g. City A Corporation",
    },
    footerCopyright: {
      sectionLabel: "Footer Copyright",
    },
    applyButton: {
      label: "Apply Theme",
    },
    toastMessages: {
      themeAppliedToService: "Theme applied to this service",
      themeAppliedToPlatform: "Platform-wide theme applied",
    },
    preview: {
      previewLabel: "Preview",
      citizenPortalLabel: "Citizen Portal",
      welcomeHeading: "Welcome back, Alexander",
      welcomeSubtext:
        "Your governance dashboard — manage applications and services.",
      statCardActiveApplicationsLabel: "Active Applications",
      statCardActiveApplicationsValue: "12",
      statCardActiveApplicationsSubtext: "3 pending review",
      statCardPropertyTaxLabel: "Property Tax",
      statCardPropertyTaxValue: "$1,240",
      statCardPropertyTaxSubtext: "Due by Jan 31",
      statCardComplaintsLabel: "Complaints",
      statCardComplaintsValue: "5",
      statCardComplaintsSubtext: "2 resolved this week",
      actionButtonNewApplication: "New Application",
      actionButtonPayDues: "Pay Dues",
      recentDocumentsHeading: "Recent Documents",
      navHome: "Home",
      navApplications: "Applications",
      navHelp: "Help",
      documentTimestamp: "2 days ago",
    },
  },

  auditLogs: {
    header: {
      title: "Audit Logs",
      description:
        "Investigate who did what, when and where — across governance, configuration, deployments, and runtime activity in one unified, searchable timeline.",
    },
    buttons: {
      exportLogs: "Export Logs",
      downloadAuditReport: "Download Audit Report",
    },
    toasts: {
      nothingToExport: "Nothing to export",
      exportedRecords: "Exported {count} records",
      auditReportDownloaded: "Audit report downloaded",
    },
    insightStrip: {
      failedSignIns: "failed sign-ins · 24h",
      permissionChangesToday: "permission changes today",
      deploymentRollbacks: "deployment rollbacks",
      servicesModified: "services modified",
    },
  },

  citizenHome: {
    navigation: {
      backLabel: "All Applications",
    },
    welcomeCard: {
      heading: "Apply, Track & Manage",
      description: "Apply for a new license or manage existing ones.",
    },
    search: {
      placeholder: "Search applications or licenses",
    },
    metrics: {
      totalApplications: "Total Applications",
      paymentsDue: "Payments Due",
      activeLicenses: "Active Licenses",
    },
    draftResume: {
      eyebrow: "Continue where you left off",
      applicationLabel: "{serviceName} Application",
      stepProgress: "Step {stepNumber} of 5 · {stepName}",
    },
    actionTiles: {
      sectionLabel: "What would you like to do?",
      applyLabel: "Apply",
      applyDescription: "Start a new application",
      myApplicationsLabel: "My Applications",
      myDocumentsLabel: "My Documents",
      myDocumentsDescription:
        "{count} documents — Saved documents you can reuse",
    },
    stepNames: {
      step1: "Applicant Details",
      step2: "Business Details",
      step3: "Business Location",
      step4: "Operational Details",
      step5: "Documents",
    },
  },

  serviceCatalogue: {
    welcomeCard: {
      portalBadge: "Citizen Portal",
      heading: "Licenses & Permits",
      subheading:
        "Browse services and apply, pay, or download from one place",
    },
    search: {
      placeholder: "Search applications",
    },
    serviceList: {
      sectionLabel: "Available Services",
    },
    serviceCards: {
      tradeLicenseDescription:
        "Required for businesses operating within municipal limits",
      buildingPermitTitle: "Building Permit",
      buildingPermitDescription: "Construction & occupancy approvals.",
      eventPermitTitle: "Event Permit",
      eventPermitDescription: "Public gathering & temporary use.",
    },
    badges: {
      comingSoon: "Soon",
    },
  },

  applicationIntro: {
    header: {
      getReadyHeading: "Get these ready before you start",
      timingDescription: "This will take about 5–7 minutes.",
      saveProgressNote: "You can save your progress and continue anytime.",
    },
    sectionLabel: {
      keepReadyLabel: "Keep these ready",
    },
    checklistItems: {
      yourDetailsTitle: "Your details",
      yourDetailsSub: "Name, mobile number, and a valid ID",
      businessDetailsTitle: "Business details",
      businessDetailsSub: "Business name, type, and category",
      businessLocationTitle: "Business location",
      businessLocationSub:
        "Address or area where your business operates",
      teamTitle: "Team (if applicable)",
      teamSub: "Names and phone numbers of people involved",
      documentsTitle: "Documents",
      documentsSub: "ID proof, address proof, and business proof",
    },
    buttons: {
      startApplication: "Start Application",
    },
  },

  applicationForm: {
    navigation: {
      backLabel: "Back",
    },
    wizardProgress: {
      reviewStepName: "Review",
    },
    draftBanner: {
      draftRestoredMessage: "Draft restored — continue where you left off.",
      discardButton: "Discard",
    },
    renewalBanner: {
      renewingNotice:
        "Renewing {serviceName} — details pre-filled from your existing license.",
    },
    mapSubScreen: {
      searchPlaceholder: "Search by pincode or area",
      dropPinHint: "Long press to drop a pin",
      confirmLocationButton: "Confirm Location",
    },
    fileUpload: {
      uploadNewButton: "Upload New",
      myDocumentsButton: "My Documents",
      fileTypeHint: "PDF / JPG / PNG · max 5 MB",
      reusedBadge: "Reused",
    },
    dropdown: {
      defaultPlaceholder: "Select...",
    },
    validation: {
      fieldRequired: "{fieldLabel} is required",
      checkboxRequired: "You must confirm to proceed",
      minLength: "Must be at least {minLength} characters",
      maxLength: "Must be at most {maxLength} characters",
      invalidFormat: "Invalid format",
      minimumValue: "Minimum {min}",
      maximumValue: "Maximum {max}",
      pastDateOnly: "Must be a date in the past",
    },
    toasts: {
      declarationRequired: "Please confirm the declaration",
      requiredFieldsError: "Please complete required fields",
      requiredFieldsDescription:
        "Some fields need attention before continuing.",
    },
    wizardFooter: {
      backButton: "Back",
      nextButton: "Next",
      skipLink: "Skip for now",
    },
    reviewScreen: {
      heading: "Review your application",
      subheading: "Check each section carefully before submitting.",
      editButton: "Edit",
      noDocumentsUploaded: "No documents uploaded.",
      noDetailsProvided: "No details provided.",
      reusedBadge: "Reused",
    },
    reviewFooter: {
      declarationCheckbox:
        "I confirm that all the details provided are correct",
      scrollToBottomHint: "Scroll to the bottom to confirm",
      backButton: "Back",
      submitButton: "Submit",
    },
    documentPickerDialog: {
      dialogTitle: "Pick from My Documents",
      dialogDescription:
        "Select a document to attach as {pickerField}.",
      emptyState:
        "You haven't uploaded any documents yet. Visit \"My Documents\" from the home screen to add some.",
      cancelButton: "Cancel",
    },
  },

  myApplications: {
    header: {
      brandName: "DIGIT",
      brandEnv: "| dev",
    },
    breadcrumb: {
      homeLink: "Home",
      separator: "/",
      currentPage: "My Applications",
    },
    pageTitle: {
      heading: "My Applications",
    },
    emptyState: {
      noApplicationsMessage: "No applications yet.",
      startNewApplicationLink: "Start a new application →",
    },
    applicationCard: {
      renewalTypeBadge: "Renewal",
      newTypeBadge: "New",
      defaultBusinessName: "Business",
    },
    buttons: {
      payNow: "Pay Now — ₹{total}",
      downloadLicense: "Download License",
      renewLicense: "Renew License",
    },
  },

  applicationDetail: {
    header: {
      brandName: "DIGIT",
      brandEnv: "| dev",
    },
    breadcrumb: {
      home: "Home",
      myApplications: "My Applications",
      detail: "Detail",
    },
    downloadDropdown: {
      buttonLabel: "Download",
      menuHeading: "Include in PDF",
      documentsListCheckbox: "Documents list",
      downloadPdfItem: "Download PDF",
    },
    applicationSection: {
      heading: "Application Details",
      appNumberLabel: "App #",
      statusLabel: "Status",
    },
    paymentSection: {
      subLabel: "Payment",
      paidBadge: "Paid",
      pendingBadge: "Pending",
      baseFeeLabel: "Base Fee",
      taxGstLabel: "Tax / GST",
      areaFeeLabel: "Area Fee",
      hazardFeeLabel: "Hazard Fee",
      multiplierLabel: "Multiplier",
      areaFeeEmptyValue: "—",
      hazardFeeEmptyValue: "—",
      multiplierEmptyValue: "—",
      totalLabel: "Total",
      txnIdLabel: "Txn ID",
      paidOnLabel: "Paid On",
      payNowButton: "Pay Now ₹{total}",
    },
    documentsSection: {
      sectionHeading: "Documents",
      allVerifiedBadge: "All verified",
      demandNoticeTitle: "Demand Notice",
      demandNoticeSubtitle: "Fee bill · {date}",
      paymentInvoiceTitle: "Payment Invoice",
      paymentInvoiceSubtitle: "Receipt · {date}",
      businessLicenseCertificateTitle: "Business License Certificate",
      viewButton: "View",
    },
    documentStatusLabels: {
      reusedBadge: "Reused",
      pendingVerificationStatus: "Pending Verification",
      verifiedStatus: "Verified",
      rejectedStatus: "Rejected",
    },
    timelineSection: {
      sectionHeading: "Timeline",
    },
    errorState: {
      applicationNotFound: "Application not found.",
    },
  },

  successScreen: {
    header: {
      appBarTitle: "DIGIT",
      appBarEnv: "| dev",
    },
    breadcrumb: {
      homeLink: "Home",
      separator: "/",
      currentPage: "Submitted",
    },
    confirmationCard: {
      heading: "Your application has been submitted",
      applicationIdLabel: "Your Application ID",
    },
    notices: {
      reviewNotice:
        "A clerk will review your application shortly. You'll be notified about payment and license issuance.",
    },
    buttons: {
      downloadInvoice: "Download Invoice",
      viewApplication: "View Application",
      goToHome: "Go To Home",
    },
    accessibility: {
      copyButtonAriaLabel: "Copy Application ID",
    },
    toast: {
      applicationIdCopied: "Application ID copied",
    },
  },

  employeeHome: {
    header: {
      pageTitle: "Licenses & Permits",
      pageSubtitle: "Review and process applications across services",
    },
    sectionLabels: {
      services: "Services",
      recentActivity: "Recent Activity",
    },
    metricCards: {
      totalApplications: "Total Applications",
      pendingReview: "Pending Review",
      approved: "Approved",
      rejected: "Rejected",
    },
    serviceCards: {
      defaultServiceTitle: "Business License",
      buildingPermitTitle: "Building Permit",
      eventPermitTitle: "Event Permit",
      pendingSubtitle: "{pending} pending review",
      noPendingSubtitle: "No pending items",
      inboxButton: "Inbox · {pending}",
      viewStatsAriaLabel: "View stats",
    },
    recentActivityTable: {
      columnApplicationId: "Application ID",
      columnApplicant: "Applicant",
      columnService: "Service",
      columnStatus: "Status",
      columnLastUpdated: "Last Updated",
      columnAction: "Action",
      emptyState: "No recent activity yet.",
      actionReview: "Review",
      actionView: "View",
      viewInboxLink: "View inbox →",
    },
    statusBadges: {
      pendingReview: "Pending Review",
      inProgress: "In Progress",
      approved: "Approved",
      rejected: "Rejected",
    },
  },

  inboxView: {
    breadcrumb: {
      home: "Home",
      inbox: "Inbox",
    },
    header: {
      title: "Inbox",
      applicationCountSingular: "{count} application",
      applicationCountPlural: "{count} applications",
    },
    filter: {
      showingLabel: "Showing: {filterLabel}",
      clearButton: "Clear",
      defaultQueueLabel: "{activeRoleName} queue",
    },
    emptyState: {
      heading: "Inbox zero!",
      noApplicationsMessage: "No applications in your queue.",
      noCasesAssignedMessage:
        "No cases assigned to {activeRoleName} in the current workflow.",
    },
    table: {
      columnApplicationNumber: "Application Number",
      columnType: "Type",
      columnBusiness: "Business",
      columnStatus: "Status",
      columnSubmitted: "Submitted",
    },
    applicationTypeBadge: {
      renewal: "Renewal",
      new: "New",
    },
    fallback: {
      emptyBusinessName: "—",
    },
  },

  applicationReview: {
    navigation: {
      backToInbox: "Back to Inbox",
    },
    downloadMenu: {
      buttonLabel: "Download",
      menuHeading: "Include in PDF",
      optionDocuments: "Documents list",
      optionChecklists: "Checklists",
      downloadPdf: "Download PDF",
    },
    applicationHeader: {
      badgeRenewal: "Renewal",
      badgeNew: "New",
      parentLicensePrefix: "Parent: {licenseNumber}",
    },
    demandBanner: {
      totalAmount: "₹{total}",
      feeAndTax: "Fee ₹{fee} + Tax ₹{tax}",
      paidOnDetails: "• Paid on {date} ({txnId})",
      payByDueDate: "• Pay by due date",
      statusPaid: "Paid",
      statusAwaitingPayment: "Awaiting Payment",
    },
    tabs: {
      applicant: "Applicant",
      business: "Business",
      documents: "Documents",
      checklist: "Checklist",
      timeline: "Timeline",
    },
    applicantAndBusinessTab: {
      emptyState: "No data.",
    },
    documentsTab: {
      emptyState: "No documents uploaded.",
      allVerifiedBanner: "All documents verified",
      verifyInstructions: "Click any document to preview and verify.",
      badgeReused: "Reused",
    },
    checklistTab: {
      emptyStateTitle: "No checklists yet.",
      emptyStateSubtitle: "Items appear here as officers take actions.",
      pendingNotice:
        "Items will be checked off when an officer triggers \"{transitionName}\".",
    },
    actionBar: {
      completeRenewalButton: "Complete Renewal",
      issueLicenseButton: "Issue License",
      verifyDocsTooltip: "Verify all documents first",
      verifyDocsInlineHint: "(verify docs)",
      waitingForPayment: "Waiting for citizen to pay.",
      noActionsForRole: "No actions for {role}.",
    },
  },
} as const;

export { copy };

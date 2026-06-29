// Portuguese (European) translation — mirrors the structure of copy.ts

const copy_pt = {
  common: {
    buttons: {
      back: "Voltar",
      continue: "Continuar",
      cancel: "Cancelar",
      save: "Guardar",
      delete: "Eliminar",
      edit: "Editar",
      skipForNow: "Saltar por agora",
      saveChanges: "Guardar alterações",
    },
    toasts: {
      copySuccess: "Copiado",
      inviteLinkCopied: "Ligação de convite copiada",
    },
    statusBadges: {
      active: "Ativo",
      draft: "Rascunho",
      published: "Publicado",
      live: "Em direto",
      assigned: "Atribuído",
      invited: "Convidado",
      disabled: "Desativado",
    },
    badges: {
      comingSoon: "Em breve",
      done: "Concluído",
      required: "Obrigatório",
      optional: "Opcional",
    },
    errors: {
      invalidEmail: "Email inválido",
    },
  },

  signIn: {
    stepIndicator: {
      stepLabel: "Passo 1 de 3 · Iniciar sessão",
    },
    header: {
      eyebrow: "Acesso à Área de Trabalho",
      heading: "Iniciar sessão na sua área de trabalho",
      description:
        "Introduza o seu email de trabalho e a senha temporária partilhada pela sua equipa de plataforma.",
    },
    form: {
      emailLabel: "Endereço de email",
      emailPlaceholder: "voce@organizacao.gov",
      passwordLabel: "Senha temporária",
      passwordPlaceholder: "Introduza a senha temporária",
    },
    errors: {
      invalidCredentials:
        "Email ou senha inválidos. Utilize as credenciais indicadas abaixo.",
    },
    buttons: {
      signIn: "Iniciar sessão",
    },
    demoCredentials: {
      sectionToggleLabel: "Credenciais de demonstração",
      roleLabelSuperAdmin: "Super Administrador",
      roleLabelAdmin: "Administrador",
      roleLabelServiceOwner: "Responsável pelo Serviço",
    },
  },

  authShellFeatureCards: {
    header: {
      brandName: "Cidade do Cabo — Consola de Administração",
      logoAlt: "Cidade do Cabo",
    },
    sidePanel: {
      secureAccessBadge: "Acesso Seguro",
    },
    featureCards: {
      card1Title: "Configure sem código",
      card1Desc:
        "Configure formulários, fluxos de trabalho, taxas e notificações através de uma interface visual.",
      card2Title: "Múltiplos serviços, uma área de trabalho",
      card2Desc:
        "Gira todos os serviços governamentais a partir de uma única consola de administração.",
      card3Title: "Acesso baseado em funções",
      card3Desc:
        "Atribua administradores, responsáveis por serviços e operadores com permissões detalhadas.",
      card4Title: "Entre em funcionamento em dias",
      card4Desc:
        "Lance portais para cidadãos e áreas de trabalho para funcionários diretamente a partir de modelos.",
    },
    trustBar: {
      trustedByLabel: "Confiado por instituições públicas",
    },
    footer: {
      workspaceLabel: "Área de trabalho governamental segura",
      versionLabel: "v1.0",
    },
  },

  resetPassword: {
    header: {
      stepLabel: "Passo 2 de 3 · Redefinir senha",
      sectionEyebrow: "Redefinição de Senha Segura",
      heading: "Definir uma nova senha",
      description:
        "Por segurança, substitua a sua senha temporária antes de aceder à sua área de trabalho.",
    },
    buttons: {
      back: "Voltar",
      continue: "Continuar",
    },
    form: {
      currentPasswordLabel: "Senha atual",
      currentPasswordPlaceholder: "Introduza a senha temporária",
      newPasswordLabel: "Nova senha",
      newPasswordPlaceholder: "Pelo menos 8 caracteres",
      newPasswordHint: "Pelo menos 8 caracteres. Use letras e números.",
      confirmPasswordLabel: "Confirmar nova senha",
      confirmPasswordPlaceholder: "Reintroduza a nova senha",
    },
    errors: {
      incorrectCurrentPassword: "A senha atual está incorreta.",
      newPasswordTooShort: "A nova senha deve ter pelo menos 8 caracteres.",
      newPasswordSameAsCurrent:
        "A nova senha deve ser diferente da senha atual.",
      passwordsDoNotMatch: "As senhas não coincidem.",
    },
  },

  confirmOrg: {
    header: {
      welcomeHeading: "Bem-vindo ao Estúdio de Licenças e Autorizações",
      subDescription:
        "Confirme alguns detalhes para terminar a ativação da sua área de trabalho.",
      stepLabel: "Passo 3 de 3 · Configuração da área de trabalho",
    },
    notice: {
      infoText:
        "Esta informação foi pré-configurada pelo seu parceiro de implementação. Reveja e confirme antes de continuar.",
    },
    logoButton: {
      ariaLabel: "Carregar logótipo da organização",
      imgAlt: "Logótipo",
    },
    regionalSettings: {
      sectionTitle: "Definições Regionais",
      editButtonLabel: "Editar",
      editButtonAriaLabel: "Editar definições regionais",
      saveButtonLabel: "Guardar Alterações",
      saveButtonAriaLabel: "Bloquear definições regionais",
      jurisdictionLabel: "Jurisdição Operacional",
      jurisdictionPlaceholder: "Selecionar jurisdição",
      currencyLabel: "Moeda",
      currencyPlaceholder: "Selecionar moeda",
      countryCodeLabel: "Código do país",
      countryCodePlaceholder: "Selecionar código",
      defaultLanguageLabel: "Idioma predefinido",
      languageHint:
        "Pode adicionar e configurar idiomas adicionais mais tarde nas Definições.",
      dateFormatLabel: "Formato de data",
      financialYearStartLabel: "Início do ano financeiro",
      dateFormatOptionDDMMYYYY: "DD/MM/AAAA",
      dateFormatOptionMMDDYYYY: "MM/DD/AAAA",
      dateFormatOptionYYYYMMDD: "AAAA-MM-DD",
      financialYearJanuary: "Janeiro (Jan – Dez)",
      financialYearApril: "Abril (Abr – Mar)",
      financialYearJuly: "Julho (Jul – Jun)",
      financialYearOctober: "Outubro (Out – Set)",
      languageOptionEnglish: "Inglês",
    },
    workspaceAccess: {
      sectionTitle: "Acesso à Área de Trabalho",
      orgNameLabel: "Nome da organização",
      workspaceUrlLabel: "URL da área de trabalho",
      copyUrlAriaLabel: "Copiar URL da área de trabalho",
      workspaceUrlHint:
        "Os requerentes e funcionários acederão aos serviços através deste URL.",
    },
    toast: {
      copySuccess: "URL da área de trabalho copiado",
      copyError: "Não foi possível copiar",
    },
    footer: {
      backButtonLabel: "Voltar",
      settingsHint: "Pode atualizar estes dados a qualquer momento nas Definições da Área de Trabalho.",
      continueButtonLabel: "Continuar",
    },
  },

  addAdmins: {
    stepIndicator: {
      stepLabel: "Passo 4 de 4 · Equipa de administração",
    },
    header: {
      heading: "Construa a sua equipa de administração",
      subheading: "Convide administradores adicionais para ajudar a gerir {orgName}.",
      subheadingFallback:
        "Convide administradores adicionais para ajudar a gerir a sua organização.",
    },
    notice: {
      noteLabel: "Nota:",
      noteBody:
        "Como Super Administrador, é a única pessoa que pode criar ou eliminar contas de Administrador. Os administradores que convidar aqui terão acesso total à plataforma, exceto a gestão de utilizadores Administrador.",
    },
    form: {
      emailFieldLabel: "Endereços de email de administrador",
      emailPlaceholder: "admin@organizacao.gov",
      emailHint: "Prima Enter para adicionar. Cada administrador receberá um convite por email.",
    },
    buttons: {
      addEmail: "Adicionar",
      skipForNow: "Saltar por agora",
      continueWithAdmins: "Continuar com {count} administrador",
      continueWithAdminsPlural: "Continuar com {count} administradores",
      continueDefault: "Continuar",
    },
    invitedList: {
      sectionLabel: "Convidados ({count})",
      sentConfirmation:
        "Foi enviado um email de convite para cada endereço abaixo.",
      pendingBadge: "A aguardar aceitação",
    },
    tooltips: {
      copyInviteLink: "Copiar ligação de convite",
      resendInviteEmail: "Reenviar email de convite",
    },
    toasts: {
      invalidEmailTitle: "Email inválido",
      inviteLinkCopiedTitle: "Ligação de convite copiada",
      inviteResentTitle: "Convite reenviado para {email}",
    },
  },

  dashboard: {
    statusBadges: {
      draft: "Rascunho",
      published: "Publicado",
      live: "Em direto",
      assigned: "Atribuído",
    },
    serviceCard: {
      fromTemplate: "A partir do modelo",
      flowsSingular: "{count} fluxo",
      flowsPlural: "{count} fluxos",
      deleteAriaLabel: "Eliminar {serviceName}",
      awaitingSetup: "A aguardar configuração",
      viewButton: "Ver",
      editButton: "Editar",
      configureButton: "Configurar",
      goLiveButton: "Entrar em Direto",
      setUpButton: "Configurar",
    },
    header: {
      titleAdmin: "Configurar e Lançar Licenças e Autorizações",
      titleServiceOwner: "Os Seus Serviços",
      subtitleAdmin:
        "Configure aplicações de Licenças e Autorizações para gerir a prestação de serviços ao cidadão do início ao fim.",
      subtitleServiceOwner:
        "Configure e gira os serviços pelos quais é responsável.",
    },
    metrics: {
      totalServices: "Total de Serviços",
      drafts: "Rascunhos",
      live: "Em Direto",
      assigned: "Atribuídos",
    },
    emptyState: {
      getStartedBadge: "Começar",
      heading: "Configure a sua primeira aplicação",
      description: "Escolha um modelo pronto a usar para lançar em minutos.",
      chooseTemplateButton: "Escolher Modelo",
    },
    sections: {
      myServicesHeading: "Os Meus Serviços",
      addServiceButton: "Adicionar serviço",
      assignedHeading: "Atribuídos",
      assignedSubtext: "— a aguardar configuração pelos responsáveis",
      assignedToYouHeading: "Atribuídos a si",
      browseTemplatesButton: "Explorar modelos",
      noServicesYet: "Ainda não criou nenhum serviço.",
    },
    deleteDialog: {
      title: "Eliminar \"{serviceName}\"?",
      description:
        "Isto remove permanentemente o serviço e a sua configuração (formulários, fluxo de trabalho, taxas, documentos).",
      liveWarning: " Os serviços em direto ficarão offline imediatamente.",
      confirmInputLabel: "Escreva {serviceName} para confirmar",
      cancelButton: "Cancelar",
      deleteButton: "Eliminar",
    },
    toastMessages: {
      deleteSuccess: "\"{serviceName}\" eliminado",
    },
  },

  services: {
    header: {
      pageTitle: "Modelos",
      pageSubtitle:
        "Escolha um modelo de aplicação pronto a usar para começar rapidamente.",
    },
    templateCard: {
      comingSoonBadge: "Em breve",
      alsoCalledLabel: "Também denominado:",
    },
    templateDetailView: {
      backButton: "Voltar aos Modelos",
      comingSoonBadge: "Em breve",
      alsoCalledLabel: "Também denominado:",
      assignToTeammateButton: "Atribuir a colega",
      useThisTemplateButton: "Usar este modelo",
      setupTimeLabel: "Tempo de configuração: {estimatedSetupTime}",
    },
    stats: {
      flowsLabel: "Fluxos",
      rolesLabel: "Funções",
      formsLabel: "Formulários",
      setupLabel: "Configuração",
    },
    livePreview: {
      livePreviewBadge: "Pré-visualização em Direto",
      interactiveHint:
        "Clique para navegar na aplicação · Mude de função acima para explorar diferentes vistas",
    },
    howItWorks: {
      sectionHeading: "Como funciona",
    },
    flowsSection: {
      sectionHeading: "Fluxos",
      modifyFlowsButton: "Modificar Fluxos",
      stepsCountBadge: "{count} passos",
    },
    rolesSection: {
      sectionHeading: "Funções",
      addEditRolesButton: "Adicionar/Editar Funções",
    },
    formsSection: {
      sectionHeading: "Formulários",
      addEditFieldsButton: "Adicionar/Editar Campos",
    },
    notificationsSection: {
      sectionHeading: "Notificações",
      addEditNotificationsButton: "Adicionar/Editar Notificações",
    },
    paymentsSection: {
      sectionHeading: "Pagamentos",
      editPaymentLogicButton: "Editar Lógica de Pagamento",
    },
    customizeSection: {
      sectionHeading: "Personalizar",
      formsChip: "Formulários",
      rolesChip: "Funções",
      fieldsChip: "Campos",
      workflowChip: "Fluxo de Trabalho",
      notificationsChip: "Notificações",
      documentsChip: "Documentos",
      chipTooltip: "Editável nas definições de {chipLabel}",
    },
  },

  step1Identity: {
    header: {
      heading: "Configure a sua aplicação",
      subheading:
        "Dê um nome ao seu serviço. É assim que os seus funcionários e cidadãos verão o serviço nas suas interfaces.",
    },
    form: {
      applicationNameLabel: "Nome da aplicação",
      applicationNamePlaceholder: "{templateName}",
      helperText:
        "Pré-preenchido a partir do modelo {templateName}. Pode mudar o nome a qualquer momento.",
    },
    errors: {
      duplicateNameError: "Já existe uma aplicação com este nome.",
    },
    buttons: {
      continueButton: "Continuar",
    },
  },

  step2Modules: {
    header: {
      heading: "Selecionar módulos para o seu serviço",
      subheading:
        "Inclua os seguintes casos de utilização no seu serviço. Pode atualizá-los a qualquer momento.",
    },
    issuanceCard: {
      title: "Emissão",
      badgeLabel: "Predefinido",
      description:
        "Aceite candidaturas, analise, aprove e emita novas licenças.",
    },
    renewalCard: {
      title: "Renovação",
      description: "Permita que os cidadãos renovem licenças existentes antes de expirarem.",
      conditionalNote:
        "As políticas de renovação podem ser configuradas separadamente para categorias e subcategorias.",
    },
    buttons: {
      continue: "Continuar",
    },
  },

  step3Categories: {
    header: {
      title: "Vamos estruturar as suas licenças",
      subtitle:
        "Algumas perguntas rápidas ajudam-nos a pré-configurar corretamente a sua aplicação.",
    },
    categoriesCard: {
      questionLabel: "Tem categorias de licença?",
      exampleHint: "Por exemplo: Retalho, Indústria, Hotelaria.",
    },
    subcategoriesCard: {
      questionLabel: "Tem subcategorias de licença?",
      exampleHint:
        "Por exemplo: Restaurante em Hotelaria, Padaria em Retalho.",
    },
    toggle: {
      yes: "Sim",
      no: "Não",
    },
    dropzone: {
      uploadPromptBold: "Clique para carregar",
      uploadPromptSuffix: "ou arraste um ficheiro",
      acceptedFormats: "CSV ou Excel (.csv, .xlsx)",
      skipHint: "Saltar por agora e adicionar mais tarde no configurador.",
      downloadSampleLink: "Descarregar ficheiro de exemplo",
    },
    buttons: {
      continue: "Continuar",
    },
  },

  step4Initializing: {
    header: {
      heading: "A construir o seu serviço",
      subheading: "Estamos a preparar tudo com base no seu modelo.",
    },
    tasks: {
      creatingApplication: "A criar a aplicação {serviceName}",
      configuringModules: "A configurar módulos",
      preparingWorkflows: "A preparar fluxos de trabalho",
      settingUpRenewals: "A configurar renovações",
      preparingDocumentTemplates: "A preparar modelos de documentos",
      linkingCategories: "A ligar categorias",
      generatingExperiences: "A gerar experiências para cidadãos e funcionários",
    },
    taskStatus: {
      skippedLabel: "(saltado)",
    },
  },

  overviewWorkspace: {
    heroBadge: {
      live: "Em Direto",
      readyForLaunch: "Pronto para Lançar",
      ready: "Pronto",
    },
    heroDescription: {
      generatedSuccessfully:
        "Este serviço foi gerado com sucesso a partir do modelo {templateName}. Pode publicá-lo imediatamente com as configurações predefinidas ou rever e personalizar antes de entrar em direto.",
    },
    heroButtons: {
      goLive: "Entrar em Direto",
      previewExperience: "Pré-visualizar Experiência",
      customizeService: "Configurar Aplicação",
    },
    serviceReadiness: {
      sectionHeading: "Prontidão do Serviço",
      modulesSelected: "Módulos Selecionados",
      businessCategoriesConfigured: "Categorias de Negócio Configuradas",
      citizenPortalGenerated: "Portal do Cidadão Gerado",
      employeeWorkspaceGenerated: "Área de Trabalho do Funcionário Gerada",
      renewalPolicyConfigured: "Política de Renovação Configurada",
      dashboard: "Painel",
      dashboardBadge: "Gerado automaticamente",
    },
    renewalPolicy: {
      notEnabled: "Não ativado",
      globalMonths: "{count} Meses (Global)",
      categoryBased: "Por Categoria",
      subcategoryBased: "Por Subcategoria",
      configured: "Configurado",
    },
    summarize: {
      none: "Nenhum",
      moreItems: "+{count} mais",
    },
    templateSetup: {
      sectionHeading: "Configuração do Modelo",
      templateLabel: "Modelo",
      modulesLabel: "Módulos",
      categoriesLabel: "Categorias",
      categoriesConfigured: "{count} configuradas",
      renewalPolicyLabel: "Política de Renovação",
      editSetup: "Editar configuração",
    },
    generatedExperiences: {
      sectionHeading: "Experiências Geradas",
      citizenPortalTitle: "Portal do Cidadão",
      citizenPortalDescription:
        "Os requerentes podem candidatar-se, pagar taxas, acompanhar o estado e descarregar licenças.",
      employeeWorkspaceTitle: "Área de Trabalho do Funcionário",
      employeeWorkspaceDescription:
        "Os funcionários podem analisar candidaturas, processar aprovações e emitir licenças.",
    },
    boundaryConfiguration: {
      sectionHeading: "Configuração de Limites",
      noBoundariesTitle: "Sem limites configurados",
      noBoundariesDescription:
        "Configure uma hierarquia de limites em Áreas de Aplicação para que este serviço entre em direto.",
      systemDefaultBadge: "Predefinição do sistema",
      geographicBadge: "Geográfico",
      limitedBadge: "Limitado",
      operationalLevelLabel: "Nível operacional: {levelName}",
      levelsSuffix: "{count} níveis",
      changeButton: "Alterar",
    },
    nextActions: {
      sectionHeading: "O que gostaria de fazer a seguir?",
      previewExperienceTitle: "Pré-visualizar Experiência",
      previewExperienceDescription:
        "Reveja as jornadas do cidadão e do funcionário geradas a partir do modelo.",
      customizeServiceTitle: "Configurar Aplicação",
      customizeServiceDescription:
        "Modifique formulários, fluxos de trabalho, notificações, pagamentos, funções e regras de SLA.",
      monitorManageTitle: "Monitorizar e Gerir",
      monitorManageDescriptionLive:
        "Acompanhe candidaturas, desempenho de SLA e gira a implementação.",
      monitorManageDescriptionNotLive:
        "Disponível após o serviço entrar em direto.",
    },
  },

  notificationsManager: {
    header: {
      pageTitle: "{moduleName} — Notificações",
      pageSubtitle: "Cada notificação visa um canal e uma função",
      createButton: "Criar Nova Notificação",
      createButtonDisabledTitle:
        "Ative esta integração nas Definições para configurar notificações para este canal.",
    },
    infoBanner: {
      description:
        "Uma notificação = um canal + uma função de destinatário. As alterações aqui refletem-se no Fluxo de Trabalho e na Pré-visualização do Serviço.",
    },
    channelCards: {
      emailLabel: "Email",
      emailSubtitle: "Configurar notificações por email para requerentes",
      smsLabel: "SMS",
      smsSubtitle: "Configurar notificações SMS para requerentes",
      pushLabel: "Push",
      pushSubtitle: "Notificações push na aplicação para funcionários e requerentes",
      activeStatus: "Ativo",
      notConfiguredStatus: "Não configurado",
      addChannelButtonDisabledTitle:
        "Ative esta integração nas Definições para configurar notificações para este canal.",
    },
    notificationList: {
      searchPlaceholder: "Pesquisar Notificações",
      channelNotEnabledNotice:
        "Ative esta integração nas Definições para configurar notificações para este canal.",
      channelNotEnabledSettings: "Definições",
      emptyState: "Ainda não há notificações de {channelLabel}.",
      noSubjectFallback: "(sem assunto)",
      recipientBadgePrefix: "Para: {roleName}",
      editButton: "Editar",
      duplicateButton: "Duplicar",
      deleteButton: "Eliminar",
    },
    dialog: {
      titleNew: "Nova Notificação",
      titleEdit: "Editar Notificação",
      channelLabel: "Canal",
      workflowStateLabel: "Estado do Fluxo de Trabalho *",
      workflowStatePlaceholder: "Selecionar estado",
      recipientRoleLabel: "Função do Destinatário *",
      recipientRolePlaceholder: "Selecionar função",
      subjectLabel: "Assunto *",
      messageBodyLabel: "Corpo da Mensagem *",
      smsCharCount: "{charCount}/160",
      pushMessageHint: "Entregue na caixa de entrada da aplicação do destinatário.",
      personalizationLabel: "Personalização:",
      smsApprovalNotice:
        "Alguns países exigem que os modelos de SMS sejam aprovados pelos fornecedores de telecomunicações antes do envio. Verifique os requisitos do seu país e registe o modelo no seu fornecedor de SMS se necessário.",
      cancelButton: "Cancelar",
      saveButton: "Guardar",
    },
    toast: {
      savedTitle: "Notificação guardada",
      savedDescription: "{channelLabel} · {workflowState}",
    },
  },

  workflowDesigner: {
    header: {
      title: "{moduleName} — Fluxo de Trabalho",
      subtitle: "Capture cada estado e ação no seu processo",
      viewToggleVisual: "Visual",
      viewToggleTable: "Tabela",
      saveButton: "Guardar",
      addStateButton: "Adicionar Estado",
      addActionButton: "Adicionar Ação",
    },
    emptyState: {
      heading: "Comece por adicionar o seu primeiro estado",
      description: "Defina os passos no seu fluxo de processo.",
      addFirstStateButton: "Adicionar Primeiro Estado",
    },
    canvas: {
      panZoomHint: "Arraste a área vazia para mover • Ctrl/⌘ + scroll para zoom",
      zoomInTitle: "Ampliar",
      zoomOutTitle: "Reduzir",
      resetViewTitle: "Repor vista",
      zoomPercent: "{zoom}%",
    },
    tableView: {
      statesTab: "Estados ({count})",
      actionsTab: "Ações ({count})",
      statesColumnName: "Nome",
      statesColumnType: "Tipo",
      statesColumnPaymentStage: "Fase de Pagamento",
      statesColumnNotifications: "Notificações",
      actionsColumnFrom: "De",
      actionsColumnTo: "Para",
      actionsColumnAction: "Ação",
      actionsColumnRole: "Função",
      actionsColumnChecklists: "Listas de Verificação",
    },
    stateTypeBadges: {
      start: "Início",
      inProgress: "Em Progresso",
      end: "Fim",
    },
    inspector: {
      collapseAriaLabel: "Fechar inspetor",
      expandAriaLabel: "Expandir inspetor",
      emptySelectionMessage:
        "Selecione um estado ou ação para ver as suas propriedades.",
    },
    stateInspector: {
      heading: "Propriedades do Estado",
      subheading: "Configuração do estado do ciclo de vida",
      stateNameLabel: "Nome do Estado",
      stateTypeLabel: "Tipo de Estado",
      stateTypeStart: "Início",
      stateTypeInProgress: "Em Progresso",
      stateTypeEnd: "Fim",
      descriptionLabel: "Descrição",
      descriptionPlaceholder: "Descrição curta",
      paymentSectionTitle: "Pagamento cobrado aqui",
      paymentSectionDescription:
        "Escolha uma fase de pagamento configurada para cobrar ao cidadão quando a candidatura entrar neste estado.",
      paymentSelectPlaceholder: "Sem pagamento",
      paymentNoPaymentOption: "Sem pagamento",
      paymentEditTitle: "Editar fase",
      newPaymentStageButton: "Nova fase de pagamento",
      notificationsLabel: "Notificações na entrada",
      notificationsNoneAttached: "Nenhuma anexada",
      notificationsCountAttached: "{count} anexadas",
      notificationsNoneConfigured: "Ainda não há notificações configuradas.",
      newNotificationButton: "Nova notificação",
      attachedDocumentsLabel: "Documentos anexados",
      attachedDocumentsNoneAttached: "Nenhum anexado",
      attachedDocumentsNoneConfigured:
        "Ainda não há documentos configurados — adicione-os no Designer de Documentos.",
      deleteStateButton: "Eliminar Estado",
    },
    transitionInspector: {
      actionBadge: "Ação",
      fromToLabel: "De {fromName} → Para {toName}",
      actionNameLabel: "Nome da Ação",
      fromLabel: "De",
      toLabel: "Para",
      performedByRoleLabel: "Realizada por (Função)",
      createNewRoleOption: "+ Criar nova função…",
      checklistsLabel: "Listas de verificação a completar",
      checklistsNoneAttached: "Nenhuma anexada",
      checklistsCountAttached: "{count} anexadas",
      checklistsNoneConfigured: "Ainda não há listas de verificação configuradas.",
      checklistQuestionCount: "{count} pergunta",
      checklistQuestionCountPlural: "{count} perguntas",
      newChecklistButton: "Nova lista de verificação",
      addConditionsLabel: "Adicionar Condições",
      addConditionsDescription:
        "Quando ativado, esta ação só aparece se critérios de metadados específicos forem cumpridos.",
      deleteActionButton: "Eliminar Ação",
    },
    addStateDialog: {
      title: "Adicionar Estado",
      stateNameLabel: "Nome do Estado",
      stateNamePlaceholder: "ex. \"Revisão Técnica\"",
      stateTypeLabel: "Tipo de Estado",
      stateTypeStart: "Início",
      stateTypeInProgress: "Em Progresso",
      stateTypeEnd: "Fim",
      cancelButton: "Cancelar",
      addStateButton: "Adicionar Estado",
    },
    addActionDialog: {
      title: "Adicionar Ação",
      actionNameLabel: "Nome da Ação",
      actionNamePlaceholder: "ex. \"Aprovar\"",
      fromStateLabel: "Estado de Origem",
      fromStatePlaceholder: "Selecionar...",
      toStateLabel: "Estado de Destino",
      toStatePlaceholder: "Selecionar...",
      performedByRoleLabel: "Realizada por (Função)",
      createNewRoleOption: "+ Criar nova função…",
      cancelButton: "Cancelar",
      addButton: "Adicionar",
    },
    notificationEditDialog: {
      title: "Notificação",
      description: "Acionada quando a candidatura entra neste estado.",
      channelLabel: "Canal",
      channelEmail: "email",
      channelSms: "sms",
      channelPush: "push",
      workflowStateLabel: "Estado do Fluxo de Trabalho *",
      workflowStatePlaceholder: "Selecionar estado",
      recipientRoleLabel: "Função do Destinatário *",
      recipientRolePlaceholder: "Selecionar função",
      subjectLabel: "Assunto",
      messageLabel: "Mensagem",
      variablesLabel: "Variáveis:",
      deleteButton: "Eliminar",
      cancelButton: "Cancelar",
      saveButton: "Guardar",
    },
    checklistEditDialog: {
      title: "Lista de Verificação",
      description:
        "Itens que o responsável deve completar antes desta ação ser executada.",
      nameLabel: "Nome",
      workflowStateLabel: "Estado do Fluxo de Trabalho",
      workflowStatePlaceholder: "Selecionar",
      questionPlaceholder: "Texto da pergunta",
      requiredLabel: "Obrigatório",
      addQuestionButton: "Adicionar Pergunta",
      deleteButton: "Eliminar",
      cancelButton: "Cancelar",
      saveButton: "Guardar",
    },
    paymentStageEditDialog: {
      title: "Fase de Pagamento",
      description: "Configure quando e como o cidadão paga.",
      stageNameLabel: "Nome da Fase",
      stageNamePlaceholder: "ex. Taxa de Candidatura",
      workflowStateLabel: "Estado do Fluxo de Trabalho",
      workflowStatePlaceholder: "Selecionar",
      feesLabel: "Taxas",
      methodsLabel: "Métodos",
      methodOnline: "online",
      methodCounter: "balcão",
      gatewayLabel: "Gateway",
      gatewayRazorpay: "Razorpay",
      gatewayPaygov: "PayGov",
      gatewayCustom: "Personalizado",
      generateReceiptLabel: "Gerar Recibo",
      deleteButton: "Eliminar",
      cancelButton: "Cancelar",
      saveButton: "Guardar",
    },
    scopeBar: {
      applyToLabel: "Aplicar a:",
      editingLabel: "A editar:",
      categoryPlaceholder: "Escolher categoria",
      categoryWorkflowNote:
        "As alterações aplicam-se apenas ao fluxo de trabalho desta categoria.",
    },
    toastMessages: {
      workflowSaved: "Fluxo de trabalho guardado",
      onlyOneStartState: "Apenas um estado de Início é permitido",
      cannotDeleteOnlyStart: "Não é possível eliminar o único estado de Início",
      stateDeleted: "Estado \"{stateName}\" eliminado",
      roleCreated: "Função \"{roleName}\" criada",
    },
    confirmDialogs: {
      deleteStateWithActions:
        "Eliminar \"{stateName}\"?\n\nIsto também removerá {count} ação{plural} ligada(s) a ele.",
    },
    editTooltips: {
      editNotification: "Editar",
      editChecklist: "Editar",
      editStage: "Editar fase",
    },
    fieldTypes: {
      text: "Texto",
      radio: "Opção",
      checkbox: "Caixa de verificação",
      dropdown: "Lista suspensa",
      fileUpload: "Carregamento de ficheiro",
    },
  },

  rolesDesigner: {
    header: {
      title: "Designer de Funções",
      subtitle: "Defina quem pode aceder e agir sobre este serviço",
      createButtonLabel: "Criar Nova Função",
    },
    notice: {
      infoMessage:
        "As alterações às funções refletem-se automaticamente nos passos do Fluxo de Trabalho, na Pré-visualização do Serviço e em toda a configuração relacionada.",
    },
    search: {
      placeholder: "Pesquisar função",
    },
    emptyState: {
      noResultsMessage: "Nenhuma função corresponde à sua pesquisa.",
    },
    roleCard: {
      defaultBadge: "Predefinido",
      citizenTypeBadge: "Cidadão",
      employeeTypeBadge: "Funcionário",
      noWorkflowStepsBadge: "Sem passos de fluxo de trabalho",
      workflowStepsSingularBadge: "{tx} passo do fluxo de trabalho",
      workflowStepsPluralBadge: "{tx} passos do fluxo de trabalho",
      editRoleAriaLabel: "Editar função",
      deleteRoleAriaLabel: "Eliminar função",
    },
    deleteDialog: {
      title: "Eliminar função \"{pendingDeleteName}\"?",
      description:
        "Os passos do fluxo de trabalho atribuídos a esta função precisarão de ser reatribuídos manualmente. Esta ação não pode ser desfeita.",
      cancelButton: "Cancelar",
      confirmButton: "Eliminar",
    },
    toasts: {
      roleUpdated: "Função atualizada",
      roleCreated: "Função criada",
      roleDeleted: "Eliminado \"{roleName}\"",
    },
  },

  feesConfigurator: {
    header: {
      pageTitle: "Taxas",
      breadcrumb: "Licença Comercial > {moduleName}",
      addFeeButton: "Adicionar Taxa",
    },
    infoNotice: {
      helperText:
        "Defina os componentes de taxa para este serviço. Estas taxas serão usadas na configuração de pagamentos.",
    },
    emptyState: {
      heading: "Sem taxas configuradas",
      description: "Adicione a sua primeira taxa para começar.",
      addFirstFeeButton: "Adicionar Primeira Taxa",
    },
    feeCard: {
      typeLabel: "Tipo: {feeTypeLabel}",
      amountLabel: "Valor: {currency} {amount}",
      statusActive: "Ativo",
      statusDraft: "Rascunho",
      mandatoryIndicatorTooltip: "Obrigatório",
      editButton: "Editar",
      duplicateButtonAriaLabel: "Duplicar",
      deleteButtonAriaLabel: "Eliminar",
    },
    feeTypeOptions: {
      fixedLabel: "Taxa Fixa",
      fixedDescription: "Um valor fixo cobrado sempre",
      slabLabel: "Por Escalão",
      slabDescription: "O valor varia por intervalos de condições",
      conditionalLabel: "Condicional",
      conditionalDescription: "Cobrado apenas quando uma condição é cumprida",
      formulaLabel: "Por Fórmula",
      formulaDescription: "Calculado usando uma fórmula",
    },
    sheet: {
      createTitle: "Criar Taxa",
      editTitle: "Editar Taxa",
    },
    form: {
      feeNameLabel: "Nome da Taxa",
      feeNamePlaceholder: "ex. Taxa de Candidatura",
      feeCodeLabel: "Código da Taxa",
      feeCodeHint: "Gerado automaticamente a partir do nome. Editável.",
      feeTypeLabel: "Tipo de Taxa",
    },
    fixedFeeSection: {
      sectionHeading: "Taxa Fixa",
      amountLabel: "Valor",
      currencyLabel: "Moeda",
      currencyINR: "₹ INR",
      currencyUSD: "$ USD",
      currencyEUR: "€ EUR",
    },
    slabSection: {
      sectionHeading: "Configuração de Escalões",
      conditionColumnHeader: "Condição",
      amountColumnHeader: "Valor",
      conditionPlaceholder: "ex. 0–100 m²",
      addSlabButton: "Adicionar Escalão",
    },
    conditionalSection: {
      sectionHeading: "Condição",
      fieldLabel: "Campo",
      operatorLabel: "Operador",
      valueLabel: "Valor",
      valuePlaceholder: "ex. Restaurante",
      feeAmountLabel: "Valor da Taxa",
    },
    formulaSection: {
      sectionHeading: "Fórmula",
      expressionLabel: "Expressão",
      expressionPlaceholder: "ex. Área × Taxa",
      availableVariablesLabel: "Variáveis disponíveis:",
    },
    mandatoryToggle: {
      label: "Taxa Obrigatória",
      description: "Esta taxa deve ser paga para continuar",
    },
    saveButton: {
      label: "Guardar Taxa",
    },
  },

  formBuilder: {
    header: {
      titleSingleModule: "Formulário",
      titleMultiModule: "{moduleName} — Formulário",
      subtitle: "Desenhe o formulário de candidatura do cidadão para este fluxo",
      togglePreviewHide: "Ocultar pré-visualização",
      togglePreviewShow: "Mostrar pré-visualização",
      togglePreviewTooltip: "Alternar pré-visualização móvel do cidadão",
      help: "Ajuda",
    },
    stepTabs: {
      addStep: "Adicionar Passo",
    },
    fieldPalette: {
      sectionHeading: "Campos do Formulário",
      searchPlaceholder: "Pesquisar campos...",
      categoryInputFields: "Campos de Entrada",
      categorySelection: "Seleção",
      categoryUpload: "Carregamento",
      fieldName: "Nome",
      fieldAddress: "Morada",
      fieldPhone: "Telefone",
      fieldEmail: "Email",
      fieldNumeric: "Numérico",
      fieldTextInput: "Campo de Texto",
      fieldTextArea: "Área de Texto",
      fieldDatePicker: "Seletor de Data",
      fieldRadio: "Botão de Opção",
      fieldCheckbox: "Caixa de Verificação",
      fieldDropdown: "Lista Suspensa",
      fieldSelectionTag: "Etiqueta de Seleção",
      fieldFileUpload: "Carregamento de Ficheiro",
    },
    canvas: {
      stepCounter: "Passo {activeStepIndex} de {totalSteps}",
      addSubscreen: "Adicionar Sub-ecrã",
      subScreenBadgeOptional: "Opcional",
      subScreenBadgeMap: "Mapa",
      mapPlaceholder: "Marcador de posição do mapa (cidadão coloca um pin)",
      emptyActiveSubscreen:
        "Clique num tipo de campo à esquerda para adicionar campos aqui",
      emptyInactiveSubscreen: "Clique neste sub-ecrã para adicionar campos",
      fieldDeleteTooltip: "Eliminar campo",
      fileUploadPrompt: "Clique ou arraste para carregar",
      dropdownSelectPlaceholder: "Selecionar {fieldLabel}",
      defaultFieldOption1: "Opção 1",
      defaultFieldOption2: "Opção 2",
    },
    canvasNavigation: {
      stepPaginationLabel: "{currentStep} / {totalSteps}",
      deleteSubscreenTooltip: "Eliminar sub-ecrã",
    },
    propertiesPanel: {
      headingFieldProperties: "Propriedades do Campo",
      headingSubscreenProperties: "Propriedades do Sub-ecrã",
      backToSubscreen: "← Voltar ao sub-ecrã",
      tabElements: "Elementos",
      tabLogic: "Lógica",
    },
    fieldProperties: {
      labelFieldLabel: "Etiqueta do Campo",
      labelFieldType: "Tipo de Campo",
      labelPlaceholder: "Marcador de posição",
      labelHelpText: "Texto de ajuda",
      sectionValidation: "Validação",
      labelRequired: "Obrigatório",
      labelMinLength: "Comprimento mínimo",
      labelMaxLength: "Comprimento máximo",
      labelMinValue: "Valor mínimo",
      labelMaxValue: "Valor máximo",
      labelPatternRegex: "Padrão (Regex)",
      patternPlaceholder: "ex. ^[A-Z]+",
      labelPatternMessage: "Mensagem do padrão",
      patternMessagePlaceholder: "Mostrado quando o padrão falha",
      labelPastDateOnly: "Apenas datas passadas",
      sectionOptions: "Opções",
      addOptionButton: "Adicionar Opção",
      deleteFieldButton: "Eliminar Campo",
    },
    validationBadges: {
      minLength: "Comprimento mín. {value}",
      maxLength: "Comprimento máx. {value}",
      min: "Mín. {value}",
      max: "Máx. {value}",
      pattern: "Padrão",
      patternWithMessage: "Padrão: {patternMessage}",
      pastDateOnly: "Apenas datas passadas",
      conditional: "Condicional",
      dependentOptions: "Opções dependentes",
    },
    subscreenProperties: {
      labelStepName: "Nome do Passo",
      labelSubscreenTitle: "Título do Sub-ecrã",
      labelSubtitle: "Subtítulo",
      labelHelperBanner: "Banner de ajuda",
      helperBannerPlaceholder: "Mostrado acima dos campos como um banner de ajuda",
      labelOptionalSubscreen: "Sub-ecrã opcional",
      labelMapPlaceholder: "Marcador de posição do mapa",
      sectionFieldsInSubscreen: "Campos neste sub-ecrã",
      noFieldsYet: "Ainda sem campos",
      deleteStepButton: "Eliminar Passo",
      validationTooltip: "Tem validação ou lógica condicional",
    },
    logicTab: {
      emptyStateHeading: "Lógica Condicional",
      emptyStateDescription:
        "Selecione um campo para ver ou editar as suas regras de visibilidade e opções dependentes.",
      sectionConditionalVisibility: "Visibilidade Condicional",
      clearButton: "Limpar",
      conditionalVisibilityDescription:
        "Mostrar este campo apenas quando {parentLabel} é igual a {equalsValue}.",
      labelDependsOnField: "Depende do campo",
      labelEquals: "Igual a",
      chooseValuePlaceholder: "Escolher valor",
      noVisibilityRuleSet: "Nenhuma regra de visibilidade definida.",
      addVisibilityRuleButton: "Adicionar regra de visibilidade",
      sectionDependentOptions: "Opções Dependentes",
      dependentOptionsDescription:
        "As opções mudam com base em {parentLabel}.",
      labelParentField: "Campo pai",
      labelOptionsPerParentValue: "Opções por valor pai",
      parentHasNoOptions: "O pai ainda não tem opções.",
      commaSeparatedPlaceholder: "separado por vírgulas",
      noDependentOptionsRuleSet: "Nenhuma regra de opções dependentes definida.",
      addDependencyButton: "Adicionar dependência",
    },
    preview: {
      emulatorLabel: "Vista do cidadão",
    },
    footer: {
      editingNotice: "A editar o formulário {moduleName}. As alterações são guardadas por módulo.",
      backButton: "Voltar",
      saveFormButton: "Guardar Formulário",
    },
    toasts: {
      cannotDeleteLastStep: "Não é possível eliminar o último passo",
      stepDeleted: "Passo eliminado",
      stepNeedsAtLeastOneSubscreen: "O passo precisa de pelo menos um sub-ecrã",
      fieldDeleted: "Campo eliminado",
      formSavedTitle: "Formulário {moduleName} guardado",
      formSavedDescription: "A pré-visualização irá refletir as suas alterações.",
    },
    defaults: {
      untitledField: "Campo sem título",
      newQuestion: "Nova pergunta",
      stepName: "Passo {stepNumber}",
      defaultOption1: "Opção 1",
      defaultOption2: "Opção 2",
      dynamicOptionLabel: "Opção {optionNumber}",
    },
  },

  goLive: {
    header: {
      backButton: "Voltar",
      pageTitle: "Pronto para entrar em direto?",
      pageDescriptionWithService:
        "Lance \"{serviceName}\" completando os passos abaixo.",
      pageDescriptionGeneric:
        "Complete os passos obrigatórios abaixo e depois lance a sua aplicação.",
    },
    checklistSections: {
      requiredSectionLabel: "Obrigatório",
      optionalSectionLabel: "Opcional",
    },
    requiredItems: {
      boundarySetupLabel: "Configuração de Limites",
      boundarySetupDescription:
        "Configurar limites geográficos para o serviço",
      userAccessLabel: "Acesso de Utilizadores e Autenticação",
      userAccessDescription:
        "Definir tipo de acesso e método de início de sessão por função",
    },
    optionalItems: {
      customizeThemeLabel: "Personalizar Tema",
      customizeThemeDescription: "Cores da marca e aparência",
      integrationsLabel: "Integrações",
      integrationsDescription: "Ligar aplicações externas",
      additionalLanguagesLabel: "Idiomas Adicionais",
      additionalLanguagesDescription: "Adicionar mais suporte de idiomas",
    },
    badges: {
      doneBadge: "Concluído",
      requiredBadge: "Obrigatório",
      optionalBadge: "Opcional",
    },
    comingSoonDialog: {
      dialogTitle: "Em breve",
      dialogDescription:
        "{comingSoonFor} estará disponível numa próxima versão. Fique atento!",
    },
    actions: {
      goLiveButton: "Entrar em Direto",
      incompleteNotice: "Complete todos os passos obrigatórios para ativar Entrar em Direto",
    },
  },

  usersAccess: {
    header: {
      pageTitle: "Utilizadores e Acessos",
      pageDescription:
        "Gira pessoas, funções e permissões de serviço em toda a sua plataforma.",
      limitedAccessBadge: "Acesso limitado — apenas convite de Administrador",
      inviteUserButton: "Convidar Utilizador",
    },
    tabs: {
      usersTab: "Utilizadores",
      rolesTab: "Funções e Permissões",
      activityTab: "Registo de Atividade",
    },
    metricsCards: {
      totalUsersLabel: "Total de Utilizadores",
      totalUsersHint: "Em todos os serviços",
      systemUsersLabel: "Utilizadores do Sistema",
      systemUsersHint: "Acesso ao nível da plataforma",
      serviceUsersLabel: "Utilizadores do Serviço",
      serviceUsersHint: "Limitados a serviços",
      pendingInvitesLabel: "Convites Pendentes",
      pendingInvitesHint: "A aguardar aceitação",
    },
    userFilters: {
      allUsers: "Todos os Utilizadores",
      system: "Sistema",
      service: "Serviço",
      invited: "Convidados",
    },
    usersSearchPlaceholder: "Pesquisar por nome, email ou função",
    usersTable: {
      columnUser: "Utilizador",
      columnRole: "Função",
      columnServiceScope: "Âmbito do Serviço",
      columnStatus: "Estado",
      columnLastActive: "Última Atividade",
      emptyState: "Nenhum utilizador corresponde aos seus filtros.",
      superAdminBadge: "Super Administrador",
      paginationPageCount: "Página 1 de 1",
    },
    userRowActions: {
      editRole: "Editar função",
      resendInvite: "Reenviar convite",
      disableUser: "Desativar utilizador",
      reEnableUser: "Reativar utilizador",
      remove: "Remover",
    },
    statusBadges: {
      active: "Ativo",
      invited: "Convidado",
      disabled: "Desativado",
    },
    actionBadges: {
      invited: "Convidado",
      acceptedInvite: "Convite aceite",
      roleChanged: "Função alterada",
      disabled: "Desativado",
      reEnabled: "Reativado",
      removed: "Removido",
      resentInvite: "Convite reenviado",
      adminCreated: "Administrador criado",
      adminDeleted: "Administrador eliminado",
    },
    rolesTab: {
      systemRolesSectionLabel: "Funções do Sistema",
      systemRolesSectionHelper:
        "Funções ao nível da plataforma que abrangem toda a organização.",
      serviceRolesSectionLabel: "Funções do Serviço",
      serviceRolesSectionHelper:
        "Funções operacionais limitadas a um ou mais serviços.",
      onePerOrgBadge: "1 por org.",
      userSingular: "utilizador",
      userPlural: "utilizadores",
      platformWide: "Toda a plataforma",
      managePermissionsButton: "Gerir permissões",
      viewUsersButton: "Ver utilizadores",
    },
    activityLog: {
      immutableNotice:
        "Este registo é imutável e só de leitura. Todas as ações de utilizadores e funções são registadas aqui e não podem ser eliminadas.",
      searchPlaceholder: "Pesquisar por ator, utilizador ou função",
      allActionsOption: "Todas as ações",
      columnTimestamp: "Data/hora",
      columnActor: "Ator",
      columnAction: "Ação",
      columnAffectedUser: "Utilizador Afetado",
      columnRole: "Função",
      columnService: "Serviço",
      emptyState: "Nenhuma entrada do registo de atividade corresponde aos seus filtros.",
      readOnlyLabel: "Só de leitura",
    },
    toasts: {
      cannotRemoveSuperAdminTitle: "Não é possível remover o Super Administrador",
      cannotRemoveSuperAdminDescription:
        "A conta de Super Administrador não pode ser removida.",
      userRemovedTitle: "Utilizador removido",
      inviteResentTitle: "Convite reenviado",
    },
  },

  inviteUserSheet: {
    header: {
      title: "Convidar utilizadores",
      description:
        "Envie convites para entrar na sua plataforma com uma função específica.",
    },
    emailField: {
      label: "Endereços de email",
      placeholder: "nome@org.pt, …",
      helperText: "Prima Enter ou vírgula para adicionar. São permitidos múltiplos convites.",
    },
    roleField: {
      label: "Função",
      selectPlaceholder: "Selecionar uma função",
      systemRolesGroupLabel: "Funções do Sistema",
      serviceRolesGroupLabel: "Funções do Serviço",
    },
    servicesField: {
      label: "Serviços",
      helperText:
        "As funções de serviço devem ser limitadas a um ou mais serviços.",
    },
    buttons: {
      cancel: "Cancelar",
      sendInvite: "Enviar convite",
      sendInvites: "Enviar convites ({count})",
    },
    toasts: {
      invalidEmailTitle: "Email inválido",
      noEmailTitle: "Adicione pelo menos um email",
      noRoleTitle: "Escolha uma função",
      noServiceTitle: "Selecione pelo menos um serviço",
      invitedSingleTitle: "Convidada {count} pessoa",
      invitedMultipleTitle: "Convidadas {count} pessoas",
    },
  },

  roleDetailSheet: {
    header: {
      serviceBadgeLabel: "Serviço",
      systemBadgeLabel: "Sistema",
      userCountSingular: "{userCount} utilizador atribuído",
      userCountPlural: "{userCount} utilizadores atribuídos",
    },
    serviceAssignment: {
      sectionHeading: "Atribuição de Serviço",
      sectionDescription: "Escolha a quais serviços esta função se aplica.",
    },
    workflowStageAccess: {
      sectionHeading: "Acesso à Fase do Fluxo de Trabalho",
      sectionDescription:
        "Limite esta função a fases específicas por serviço.",
    },
    permissions: {
      sectionHeading: "Permissões",
      sectionDescription: "Defina o nível de acesso para cada capacidade.",
    },
    dialogs: {
      discardChangesConfirm: "Descartar alterações não guardadas?",
    },
    toast: {
      roleUpdatedTitle: "Função atualizada",
      roleUpdatedDescription: "Permissões de {roleName} guardadas.",
    },
    buttons: {
      cancel: "Cancelar",
      saveChanges: "Guardar alterações",
    },
  },

  organizationProfile: {
    header: {
      pageTitle: "Perfil da Organização",
      pageDescription:
        "Os detalhes da sua organização recolhidos durante a integração.",
    },
    card: {
      sectionTitle: "Detalhes",
    },
    fieldLabels: {
      orgName: "Nome da Organização",
      country: "País",
      department: "Departamento",
      language: "Idioma",
      themeColor: "Cor do Tema",
      logo: "Logótipo",
    },
    fallbackValues: {
      notSet: "Não definido",
      noLogoUploaded: "Sem logótipo carregado",
    },
    imageAlt: {
      orgLogo: "Logótipo da organização",
    },
  },

  brandingTheme: {
    header: {
      pageTitle: "Marca e Tema",
      pageSubtitle:
        "Personalize o aspeto e a sensação do seu portal para cidadãos",
      scopeTabService: "Este serviço",
      scopeTabPlatform: "Predefinição da plataforma",
      applyThemeButton: "Aplicar Tema",
    },
    leftPanel: {
      sectionTitle: "Propriedades do Tema",
    },
    themePresets: {
      sectionLabel: "Predefinições de Tema",
      presetNameDigit: "Tema DIGIT",
      presetDescriptionDigit: "Roboto, laranja quente e verde-azulado, raio mínimo",
      presetNameCivic: "Azul Cívico",
      presetDescriptionCivic:
        "Public Sans, azul cívico, cantos suavemente arredondados",
      presetNameBold: "Ardósia Arrojada",
      presetDescriptionBold:
        "Inter, ardósia escura + acentuação laranja, botões em pílula",
      presetNameTeal: "Verde-azulado Moderno",
      presetDescriptionTeal: "DM Sans, primário verde-azulado, botões em pílula",
    },
    fontFamily: {
      sectionLabel: "Família de Tipo de Letra",
    },
    primaryColour: {
      sectionLabel: "Cor Principal",
      helpText: "10 cores curadas adequadas ao governo",
    },
    logo: {
      sectionLabel: "Logótipo",
      uploadCta: "Clique para carregar logótipo",
      uploadHint: "PNG, SVG, JPG até 5 MB",
    },
    brandGuidelines: {
      sectionLabel: "Diretrizes da Marca",
      uploadCta: "Clique para carregar diretrizes",
      uploadHint: "PDF, PNG, SVG até 10 MB",
    },
    portalName: {
      sectionLabel: "Nome no Cabeçalho",
      placeholder: "ex. Câmara Municipal de Lisboa",
    },
    footerCopyright: {
      sectionLabel: "Copyright do Rodapé",
    },
    applyButton: {
      label: "Aplicar Tema",
    },
    toastMessages: {
      themeAppliedToService: "Tema aplicado a este serviço",
      themeAppliedToPlatform: "Tema aplicado a toda a plataforma",
    },
    preview: {
      previewLabel: "Pré-visualização",
      citizenPortalLabel: "Portal do Cidadão",
      welcomeHeading: "Bem-vindo, Alexandre",
      welcomeSubtext:
        "O seu painel de governança — gira candidaturas e serviços.",
      statCardActiveApplicationsLabel: "Candidaturas Ativas",
      statCardActiveApplicationsValue: "12",
      statCardActiveApplicationsSubtext: "3 a aguardar revisão",
      statCardPropertyTaxLabel: "IMI",
      statCardPropertyTaxValue: "1.240 €",
      statCardPropertyTaxSubtext: "Vence a 31 de jan.",
      statCardComplaintsLabel: "Reclamações",
      statCardComplaintsValue: "5",
      statCardComplaintsSubtext: "2 resolvidas esta semana",
      actionButtonNewApplication: "Nova Candidatura",
      actionButtonPayDues: "Pagar Dívidas",
      recentDocumentsHeading: "Documentos Recentes",
      navHome: "Início",
      navApplications: "Candidaturas",
      navHelp: "Ajuda",
      documentTimestamp: "Há 2 dias",
    },
  },

  auditLogs: {
    header: {
      title: "Registos de Auditoria",
      description:
        "Investigue quem fez o quê, quando e onde — através de governança, configuração, implementações e atividade em tempo real numa linha cronológica unificada e pesquisável.",
    },
    buttons: {
      exportLogs: "Exportar Registos",
      downloadAuditReport: "Descarregar Relatório de Auditoria",
    },
    toasts: {
      nothingToExport: "Nada para exportar",
      exportedRecords: "{count} registos exportados",
      auditReportDownloaded: "Relatório de auditoria descarregado",
    },
    insightStrip: {
      failedSignIns: "inícios de sessão falhados · 24h",
      permissionChangesToday: "alterações de permissão hoje",
      deploymentRollbacks: "reversões de implementação",
      servicesModified: "serviços modificados",
    },
  },

  citizenHome: {
    navigation: {
      backLabel: "Todas as Candidaturas",
    },
    welcomeCard: {
      heading: "Candidatar, Acompanhar e Gerir",
      description: "Candidate-se a uma nova licença ou gira as existentes.",
    },
    search: {
      placeholder: "Pesquisar candidaturas ou licenças",
    },
    metrics: {
      totalApplications: "Total de Candidaturas",
      paymentsDue: "Pagamentos Pendentes",
      activeLicenses: "Licenças Ativas",
    },
    draftResume: {
      eyebrow: "Continue onde parou",
      applicationLabel: "Candidatura a {serviceName}",
      stepProgress: "Passo {stepNumber} de 5 · {stepName}",
    },
    actionTiles: {
      sectionLabel: "O que gostaria de fazer?",
      applyLabel: "Candidatar",
      applyDescription: "Iniciar uma nova candidatura",
      myApplicationsLabel: "As Minhas Candidaturas",
      myDocumentsLabel: "Os Meus Documentos",
      myDocumentsDescription:
        "{count} documentos — Documentos guardados que pode reutilizar",
    },
    stepNames: {
      step1: "Detalhes do Requerente",
      step2: "Detalhes do Negócio",
      step3: "Localização do Negócio",
      step4: "Detalhes Operacionais",
      step5: "Documentos",
    },
  },

  serviceCatalogue: {
    welcomeCard: {
      portalBadge: "Portal do Cidadão",
      heading: "Licenças e Autorizações",
      subheading:
        "Explore serviços e candidate-se, pague ou descarregue num só lugar",
    },
    search: {
      placeholder: "Pesquisar candidaturas",
    },
    serviceList: {
      sectionLabel: "Serviços Disponíveis",
    },
    serviceCards: {
      tradeLicenseDescription:
        "Necessária para negócios a operar dentro dos limites municipais",
      buildingPermitTitle: "Licença de Construção",
      buildingPermitDescription: "Aprovações de construção e ocupação.",
      eventPermitTitle: "Licença para Evento",
      eventPermitDescription: "Reuniões públicas e uso temporário.",
    },
    badges: {
      comingSoon: "Em breve",
    },
  },

  applicationIntro: {
    header: {
      getReadyHeading: "Prepare estes documentos antes de começar",
      timingDescription: "Isto demorará cerca de 5 a 7 minutos.",
      saveProgressNote: "Pode guardar o seu progresso e continuar a qualquer momento.",
    },
    sectionLabel: {
      keepReadyLabel: "Tenha estes prontos",
    },
    checklistItems: {
      yourDetailsTitle: "Os seus dados",
      yourDetailsSub: "Nome, número de telemóvel e um BI válido",
      businessDetailsTitle: "Detalhes do negócio",
      businessDetailsSub: "Nome, tipo e categoria do negócio",
      businessLocationTitle: "Localização do negócio",
      businessLocationSub:
        "Morada ou área onde o seu negócio opera",
      teamTitle: "Equipa (se aplicável)",
      teamSub: "Nomes e números de telefone das pessoas envolvidas",
      documentsTitle: "Documentos",
      documentsSub: "Prova de identidade, prova de morada e prova do negócio",
    },
    buttons: {
      startApplication: "Iniciar Candidatura",
    },
  },

  applicationForm: {
    navigation: {
      backLabel: "Voltar",
    },
    wizardProgress: {
      reviewStepName: "Revisão",
    },
    draftBanner: {
      draftRestoredMessage: "Rascunho restaurado — continue onde parou.",
      discardButton: "Descartar",
    },
    renewalBanner: {
      renewingNotice:
        "A renovar {serviceName} — detalhes pré-preenchidos a partir da sua licença existente.",
    },
    mapSubScreen: {
      searchPlaceholder: "Pesquisar por código postal ou área",
      dropPinHint: "Prima longamente para colocar um pin",
      confirmLocationButton: "Confirmar Localização",
    },
    fileUpload: {
      uploadNewButton: "Carregar Novo",
      myDocumentsButton: "Os Meus Documentos",
      fileTypeHint: "PDF / JPG / PNG · máx. 5 MB",
      reusedBadge: "Reutilizado",
    },
    dropdown: {
      defaultPlaceholder: "Selecionar...",
    },
    validation: {
      fieldRequired: "{fieldLabel} é obrigatório",
      checkboxRequired: "Deve confirmar para continuar",
      minLength: "Deve ter pelo menos {minLength} caracteres",
      maxLength: "Deve ter no máximo {maxLength} caracteres",
      invalidFormat: "Formato inválido",
      minimumValue: "Mínimo {min}",
      maximumValue: "Máximo {max}",
      pastDateOnly: "Deve ser uma data no passado",
    },
    toasts: {
      declarationRequired: "Por favor confirme a declaração",
      requiredFieldsError: "Por favor preencha os campos obrigatórios",
      requiredFieldsDescription:
        "Alguns campos necessitam de atenção antes de continuar.",
    },
    wizardFooter: {
      backButton: "Voltar",
      nextButton: "Seguinte",
      skipLink: "Saltar por agora",
    },
    reviewScreen: {
      heading: "Reveja a sua candidatura",
      subheading: "Verifique cada secção cuidadosamente antes de submeter.",
      editButton: "Editar",
      noDocumentsUploaded: "Nenhum documento carregado.",
      noDetailsProvided: "Nenhum detalhe fornecido.",
      reusedBadge: "Reutilizado",
    },
    reviewFooter: {
      declarationCheckbox:
        "Confirmo que todos os detalhes fornecidos são corretos",
      scrollToBottomHint: "Role até ao fundo para confirmar",
      backButton: "Voltar",
      submitButton: "Submeter",
    },
    documentPickerDialog: {
      dialogTitle: "Escolher dos Meus Documentos",
      dialogDescription:
        "Selecione um documento para anexar como {pickerField}.",
      emptyState:
        "Ainda não carregou nenhum documento. Visite \"Os Meus Documentos\" no ecrã inicial para adicionar.",
      cancelButton: "Cancelar",
    },
  },

  myApplications: {
    header: {
      brandName: "DIGIT",
      brandEnv: "| dev",
    },
    breadcrumb: {
      homeLink: "Início",
      separator: "/",
      currentPage: "As Minhas Candidaturas",
    },
    pageTitle: {
      heading: "As Minhas Candidaturas",
    },
    emptyState: {
      noApplicationsMessage: "Ainda sem candidaturas.",
      startNewApplicationLink: "Iniciar uma nova candidatura →",
    },
    applicationCard: {
      renewalTypeBadge: "Renovação",
      newTypeBadge: "Nova",
      defaultBusinessName: "Negócio",
    },
    buttons: {
      payNow: "Pagar Agora — ₹{total}",
      downloadLicense: "Descarregar Licença",
      renewLicense: "Renovar Licença",
    },
  },

  applicationDetail: {
    header: {
      brandName: "DIGIT",
      brandEnv: "| dev",
    },
    breadcrumb: {
      home: "Início",
      myApplications: "As Minhas Candidaturas",
      detail: "Detalhe",
    },
    downloadDropdown: {
      buttonLabel: "Descarregar",
      menuHeading: "Incluir em PDF",
      documentsListCheckbox: "Lista de documentos",
      downloadPdfItem: "Descarregar PDF",
    },
    applicationSection: {
      heading: "Detalhes da Candidatura",
      appNumberLabel: "Cand. Nº",
      statusLabel: "Estado",
    },
    paymentSection: {
      subLabel: "Pagamento",
      paidBadge: "Pago",
      pendingBadge: "Pendente",
      baseFeeLabel: "Taxa Base",
      taxGstLabel: "Imposto / IVA",
      areaFeeLabel: "Taxa de Área",
      hazardFeeLabel: "Taxa de Risco",
      multiplierLabel: "Multiplicador",
      areaFeeEmptyValue: "—",
      hazardFeeEmptyValue: "—",
      multiplierEmptyValue: "—",
      totalLabel: "Total",
      txnIdLabel: "ID da Trans.",
      paidOnLabel: "Pago em",
      payNowButton: "Pagar Agora ₹{total}",
    },
    documentsSection: {
      sectionHeading: "Documentos",
      allVerifiedBadge: "Todos verificados",
      demandNoticeTitle: "Aviso de Cobrança",
      demandNoticeSubtitle: "Fatura · {date}",
      paymentInvoiceTitle: "Fatura de Pagamento",
      paymentInvoiceSubtitle: "Recibo · {date}",
      businessLicenseCertificateTitle: "Certificado de Licença Comercial",
      viewButton: "Ver",
    },
    documentStatusLabels: {
      reusedBadge: "Reutilizado",
      pendingVerificationStatus: "Verificação Pendente",
      verifiedStatus: "Verificado",
      rejectedStatus: "Rejeitado",
    },
    timelineSection: {
      sectionHeading: "Linha Cronológica",
    },
    errorState: {
      applicationNotFound: "Candidatura não encontrada.",
    },
  },

  successScreen: {
    header: {
      appBarTitle: "DIGIT",
      appBarEnv: "| dev",
    },
    breadcrumb: {
      homeLink: "Início",
      separator: "/",
      currentPage: "Submetido",
    },
    confirmationCard: {
      heading: "A sua candidatura foi submetida",
      applicationIdLabel: "O Seu ID de Candidatura",
    },
    notices: {
      reviewNotice:
        "Um funcionário irá rever a sua candidatura em breve. Será notificado sobre o pagamento e a emissão da licença.",
    },
    buttons: {
      downloadInvoice: "Descarregar Fatura",
      viewApplication: "Ver Candidatura",
      goToHome: "Ir para o Início",
    },
    accessibility: {
      copyButtonAriaLabel: "Copiar ID de Candidatura",
    },
    toast: {
      applicationIdCopied: "ID de candidatura copiado",
    },
  },

  employeeHome: {
    header: {
      pageTitle: "Licenças e Autorizações",
      pageSubtitle: "Reveja e processe candidaturas em todos os serviços",
    },
    sectionLabels: {
      services: "Serviços",
      recentActivity: "Atividade Recente",
    },
    metricCards: {
      totalApplications: "Total de Candidaturas",
      pendingReview: "A Aguardar Revisão",
      approved: "Aprovadas",
      rejected: "Rejeitadas",
    },
    serviceCards: {
      defaultServiceTitle: "Licença Comercial",
      buildingPermitTitle: "Licença de Construção",
      eventPermitTitle: "Licença para Evento",
      pendingSubtitle: "{pending} a aguardar revisão",
      noPendingSubtitle: "Sem itens pendentes",
      inboxButton: "Caixa de Entrada · {pending}",
      viewStatsAriaLabel: "Ver estatísticas",
    },
    recentActivityTable: {
      columnApplicationId: "ID da Candidatura",
      columnApplicant: "Requerente",
      columnService: "Serviço",
      columnStatus: "Estado",
      columnLastUpdated: "Última Atualização",
      columnAction: "Ação",
      emptyState: "Ainda sem atividade recente.",
      actionReview: "Rever",
      actionView: "Ver",
      viewInboxLink: "Ver caixa de entrada →",
    },
    statusBadges: {
      pendingReview: "A Aguardar Revisão",
      inProgress: "Em Progresso",
      approved: "Aprovada",
      rejected: "Rejeitada",
    },
  },

  inboxView: {
    breadcrumb: {
      home: "Início",
      inbox: "Caixa de Entrada",
    },
    header: {
      title: "Caixa de Entrada",
      applicationCountSingular: "{count} candidatura",
      applicationCountPlural: "{count} candidaturas",
    },
    filter: {
      showingLabel: "A mostrar: {filterLabel}",
      clearButton: "Limpar",
      defaultQueueLabel: "Fila de {activeRoleName}",
    },
    emptyState: {
      heading: "Caixa de entrada vazia!",
      noApplicationsMessage: "Sem candidaturas na sua fila.",
      noCasesAssignedMessage:
        "Sem casos atribuídos a {activeRoleName} no fluxo de trabalho atual.",
    },
    table: {
      columnApplicationNumber: "Número da Candidatura",
      columnType: "Tipo",
      columnBusiness: "Negócio",
      columnStatus: "Estado",
      columnSubmitted: "Submetida",
    },
    applicationTypeBadge: {
      renewal: "Renovação",
      new: "Nova",
    },
    fallback: {
      emptyBusinessName: "—",
    },
  },

  applicationReview: {
    navigation: {
      backToInbox: "Voltar à Caixa de Entrada",
    },
    downloadMenu: {
      buttonLabel: "Descarregar",
      menuHeading: "Incluir em PDF",
      optionDocuments: "Lista de documentos",
      optionChecklists: "Listas de verificação",
      downloadPdf: "Descarregar PDF",
    },
    applicationHeader: {
      badgeRenewal: "Renovação",
      badgeNew: "Nova",
      parentLicensePrefix: "Mãe: {licenseNumber}",
    },
    demandBanner: {
      totalAmount: "₹{total}",
      feeAndTax: "Taxa ₹{fee} + Imposto ₹{tax}",
      paidOnDetails: "• Pago em {date} ({txnId})",
      payByDueDate: "• Pagar até à data limite",
      statusPaid: "Pago",
      statusAwaitingPayment: "A Aguardar Pagamento",
    },
    tabs: {
      applicant: "Requerente",
      business: "Negócio",
      documents: "Documentos",
      checklist: "Lista de Verificação",
      timeline: "Linha Cronológica",
    },
    applicantAndBusinessTab: {
      emptyState: "Sem dados.",
    },
    documentsTab: {
      emptyState: "Nenhum documento carregado.",
      allVerifiedBanner: "Todos os documentos verificados",
      verifyInstructions: "Clique em qualquer documento para pré-visualizar e verificar.",
      badgeReused: "Reutilizado",
    },
    checklistTab: {
      emptyStateTitle: "Ainda sem listas de verificação.",
      emptyStateSubtitle: "Os itens aparecem aqui à medida que os funcionários tomam ações.",
      pendingNotice:
        "Os itens serão assinalados quando um funcionário acionar \"{transitionName}\".",
    },
    actionBar: {
      completeRenewalButton: "Completar Renovação",
      issueLicenseButton: "Emitir Licença",
      verifyDocsTooltip: "Verifique todos os documentos primeiro",
      verifyDocsInlineHint: "(verificar docs)",
      waitingForPayment: "A aguardar que o cidadão pague.",
      noActionsForRole: "Sem ações para {role}.",
    },
  },
} as const;

export { copy_pt };

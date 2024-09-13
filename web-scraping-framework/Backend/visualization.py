import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import pyLDAvis.sklearn
import spacy

# Load your CSV file
df = pd.read_csv('output_cleaned.csv')

# Word Cloud
wordcloud = WordCloud(width=800, height=400, background_color='white').generate(' '.join(df['Description']))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis('off')
plt.savefig('wordcloud.png')
plt.show()

# Bar Chart
plt.figure(figsize=(10, 6))
sns.countplot(y='Title', data=df)
plt.savefig('bar_chart.png')
plt.show()

# Scatter Plot
# Use your own logic to create similarity metrics
# Assuming you have similarity_matrix as a 2D array
plt.figure(figsize=(10, 6))
sns.scatterplot(x='Date', y='Detail', hue='Title', data=df)
plt.savefig('scatter_plot.png')
plt.show()

# Heatmap
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['Description'])
co_occurrence_matrix = X.T.dot(X)
plt.figure(figsize=(12, 8))
sns.heatmap(co_occurrence_matrix.toarray(), xticklabels=vectorizer.get_feature_names_out(), yticklabels=vectorizer.get_feature_names_out())
plt.savefig('heatmap.png')
plt.show()

# Topic Modeling Visualization (LDA)
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['Description'])
lda = LatentDirichletAllocation(n_components=5, random_state=42)
lda.fit(X)
pyLDAvis.sklearn.prepare(lda, X, vectorizer, mds='tsne').to_html('lda_visualization.html')

# Syntax Trees (using spaCy)
nlp = spacy.load('en_core_web_sm')
doc = nlp(df['Description'].iloc[0])
spacy.displacy.serve(doc, style='dep', page=False)

# Word Embedding Visualization (t-SNE)
# Use your own logic to get word embeddings
# Assuming you have embeddings_matrix as a 2D array
from sklearn.manifold import TSNE
tsne = TSNE(n_components=2, random_state=42)
embeddings_tsne = tsne.fit_transform(embeddings_matrix)
plt.figure(figsize=(10, 6))
plt.scatter(embeddings_tsne[:, 0], embeddings_tsne[:, 1], c='blue', alpha=0.5)
plt.savefig('word_embedding_visualization.png')
plt.show()
